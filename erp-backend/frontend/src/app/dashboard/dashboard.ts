import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
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
import {Order} from '../../models/order.model';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatTableModule, MatCardModule, MatSnackBarModule, MatIconModule, FormsModule, DatePipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  private snackBar = inject(MatSnackBar);
  orders: Order[] = [];
  filteredOrders: Order[] = [];
  activeFilter = 'all';
  displayedColumns: string[] = ['id', 'name', 'status', 'product', 'quantity', 'conveyorName', 'createdAt', 'actions'];
  private dialog = inject(MatDialog);
  private cdr = inject(ChangeDetectorRef);
  searchTerm = '';

  get totalOrders() {
    return this.orders.length;
  }

  get pendingOrders() {
    return this.orders.filter(o => o.status === 'PENDING').length;
  }

  get processingOrders() {
    return this.orders.filter(o => o.status === 'PROCESSING').length;
  }

  get completedOrders() {
    return this.orders.filter(o => o.status === 'COMPLETED').length;
  }


  constructor(private dataService: DashboardService) {
  }

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
    this.dataService.getOrders().subscribe({
      next: res => {
        this.orders = res;
        this.applyFilter();
      },
      error: err => {
        console.error('Failed to load orders.', err);
        if (err.status === 0) {
          this.notify('Something went wrong. Is the backend running?')
        } else {
          this.notify(`Error ${err.status}: ${err.statusText}`);
        }
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

  setFilter(filter: string) {
    this.activeFilter = filter;
    this.applyFilter();
  }

  getStatusClass(status: string): string {
    const map: Record<string, string> = {
      'PENDING': 'badge-pending',
      'PROCESSING': 'badge-active',
      'COMPLETED': 'badge-done',
      'CANCELLED': 'badge-cancelled'
    };
    return map[status] ?? 'badge-unknown';
  }

  getRowClass(order: Order): string {
    if (order.quantity < 10) return 'row-red';
    if (order.quantity < 50) return 'row-yellow';
    return 'row-green';
  }

  openEditDialog(row: Order) {

    const dialogRef = this.dialog.open(EditDialog, {
      width: '480px',
      data: {order: {...row}}
    });
    dialogRef.afterClosed().subscribe((result: Order) => {
      if (result) {
        console.log('Sending to backend:', JSON.stringify(result)); // ← add this
        this.dataService.updateOrder(result.id, result).subscribe({
          next: updated => {
            const index = this.orders.findIndex(o => o.id === updated.id);
            if (index !== -1) {
              this.orders[index] = updated;
              this.orders = [...this.orders];
              this.applyFilter();
              this.notify('Order updated successfully ✅');
            }
          },
          error: err => console.error('Failed to update:', JSON.stringify(err.error))
        });
      }
    });
  }

  deleteOrder(row: Order) {
    const confirmed = confirm(`Are you sure you want to delete "${row.name}"?`);
    if (confirmed) {
      this.dataService.deleteOrder(row.id).subscribe({
        next: () => {
          this.orders = this.orders.filter(o => o.id !== row.id);
          this.applyFilter();
          this.notify('Order deleted successfully ✅');
        },
        error: err => console.error('Failed to delete:', err)
      });
    }
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(CreateDialog, {width: '480px'});
    dialogRef.afterClosed().subscribe((result: Partial<Order>) => {
      if (result) {
        this.dataService.createOrder(result).subscribe({
          next: created => {
            this.orders = [...this.orders, created];
            this.applyFilter();
            this.notify('Order created successfully ✅');
          },
          error: err => {
            if (err.status === 0) {
              this.notify('⚠️ Something went wrong. Is the backend started?');
            } else if (err.status === 400 && err.error) {
              const messages = Object.values(err.error).join(', ');
              this.notify(`⚠️ ${messages}`);
            } else {
              this.notify('⚠️ Failed to create order');
            }
          }
        });
      }

    });


  }
}
