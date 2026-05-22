import { Component, OnInit, inject,ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import { DashboardService } from '../Services/DashboardService';
import { DialogBox } from '../dialog-box/dialog-box';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {EditDialog} from '../edit-dialog/edit-dialog';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatButtonModule,MatButtonModule,  MatTableModule,MatCardModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  orders: any[] = [];
  displayedColumns: string[] = ['id', 'name', 'status', 'product', 'quantity', 'actions'];
  private dialog = inject(MatDialog);
  private cdr = inject(ChangeDetectorRef);

  constructor(private dataService: DashboardService) {
  }

  ngOnInit() {
    console.log('Dashboard initialized');
    this.loadOrders();
  }

  loadOrders(): void {
    this.dataService.getData().subscribe({
      next: res => {
        console.log('API response:', res);
        console.log('Orders array:', res.orders);
        this.orders = res;
        this.cdr.detectChanges();
      },
      error: err => console.error('Failed to load orders:', err)
    });
  }
  getStatusClass(status: string): string {
    const map: Record<string, string> = {
      'Pending':   'badge-pending',
      'Active':    'badge-active',
      'Done':      'badge-done',
      'Cancelled': 'badge-cancelled'
    };
    return map[status] ?? 'badge-unknown';
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogBox, {})
  }

  openEditDialog(row: any) {
    const dialogRef = this.dialog.open(EditDialog, {
      width: '480px',
      data: { ...row }  // pass a copy so cancelling doesn't mutate the row
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // find the row and update it locally
        const index = this.orders.findIndex(o => o.id === result.id);
        if (index !== -1) {
          this.orders[index] = result;
          this.orders = [...this.orders]; // ← forces the table to re-render
          this.cdr.detectChanges();
        }
      }
    });


  }

  deleteOrder(row: any) {
    this.orders = this.orders.filter(order => order.id !== row.id);
    this.cdr.detectChanges();
    console.log(this.orders);
  }
}
