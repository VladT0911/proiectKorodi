import { Component, OnInit, inject,ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import { DashboardService } from '../Services/DashboardService';
import { DialogBox } from '../dialog-box/dialog-box';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';

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
  constructor(private dataService: DashboardService) {}

  ngOnInit() {
    console.log('Dashboard initialized');
    this.loadOrders();
  }

  loadOrders(): void {
    console.log('loadOrders called');
    this.dataService.getData().subscribe({
      next: res =>{ this.orders = res,
                        this.cdr.detectChanges();},
      error: err => console.error('Failed to load orders:', err)
    });
  }

  openDialog(): void {
    const ref = this.dialog.open(DialogBox);
    ref.afterClosed().subscribe(result => {
      if (result === true) this.loadOrders();
    });
  }

  editOrder(order: any) {
    console.log('Edit order:', order);
  }

  deleteOrder(order: any) {
    console.log('Delete order:', order);
  }
}
