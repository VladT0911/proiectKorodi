import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { DashboardService } from '../Services/DashboardService';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { EditDialog } from '../edit-dialog/edit-dialog';
import { CreateDialog } from '../create-dialog/create-dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatTableModule, MatCardModule, MatSnackBarModule, MatIconModule,FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  private snackBar = inject(MatSnackBar);
  orders: any[] = [];
  filteredOrders: any[] = [];
  activeFilter = 'all';
  displayedColumns: string[] = ['id', 'name', 'status', 'product', 'quantity', 'actions'];
  private dialog = inject(MatDialog);
  private cdr = inject(ChangeDetectorRef);
  searchTerm = '';

  get totalOrders() { return this.orders.length; }
  get pendingOrders() { return this.orders.filter(o => o.status === 'Pending').length; }
  get processingOrders() { return this.orders.filter(o => o.status === 'Processing').length; }
  get completedOrders() { return this.orders.filter(o => o.status === 'Completed').length; }

  constructor(private dataService: DashboardService) {}

  private notify(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
  }

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders(): void {
    this.dataService.getData().subscribe({
      next: res => {
        this.orders = res;
        this.applyFilter();
      },
      error: err => console.error('Failed to load orders:', err)
    });
  }



  setFilter(filter: string) {
    this.activeFilter = filter;
    this.applyFilter();
  }

  getStatusClass(status: string): string {
    const map: Record<string, string> = {
      'Pending': 'badge-pending',
      'Processing': 'badge-active',
      'Completed': 'badge-done',
      'Cancelled': 'badge-cancelled'
    };
    return map[status] ?? 'badge-unknown';
  }

  getRowClass(order: any): string {
    if (order.quantity < 10) return 'row-red';
    if (order.quantity < 50) return 'row-yellow';
    return 'row-green';
  }

  openEditDialog(row: any) {
    const dialogRef = this.dialog.open(EditDialog, {
      width: '480px',
      data: { order: { ...row } }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.orders.findIndex(o => o.id === result.id);
        if (index !== -1) {
          this.orders[index] = result;
          this.orders = [...this.orders];
          this.applyFilter(); // ← replaces cdr.detectChanges()
          this.notify('Order updated successfully ✅');
        }
      }
    });
  }

  deleteOrder(row: any) {
    const confirmed = confirm(`Are you sure you want to delete "${row.name}"?`);
    if (confirmed) {
      this.orders = this.orders.filter(order => order.id !== row.id);
      this.applyFilter(); // ← replaces cdr.detectChanges()
      this.notify('Order deleted successfully ✅');
    }
  }
  openCreateDialog(): void {
    const dialogRef = this.dialog.open(CreateDialog, { width: '480px' });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const newOrder = { ...result, id: this.orders.length + 1 };
        this.orders = [...this.orders, newOrder];
        this.applyFilter(); // ← replaces cdr.detectChanges()
        this.notify('Order created successfully ✅');
      }
    });
  }
  applyFilter() {
    let result = this.activeFilter === 'all'
      ? [...this.orders]
      : this.orders.filter(o => o.status === this.activeFilter);

    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();
      result = result.filter(o =>
        o.name?.toLowerCase().includes(term) ||
        o.product?.toLowerCase().includes(term)
      );
    }

    this.filteredOrders = result;
    this.cdr.detectChanges();
  }
}
