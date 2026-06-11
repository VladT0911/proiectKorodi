import { Component, signal, inject, OnInit } from '@angular/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../Services/DashboardService';
import {Conveyor} from '../../models/conveyor.model';

@Component({
  selector: 'app-create-dialog',
  templateUrl: './create-dialog.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ]
})
export class CreateDialog implements OnInit {
  private dialogRef = inject(MatDialogRef<CreateDialog>);
  private dashboardService = inject(DashboardService);

  // signals
  conveyors = signal<Conveyor[]>([]);
  isLoading = signal(true);
  order = signal(this.freshOrder());
  errors = signal<Record<string, string>>({});

  statusOptions = ['PENDING', 'PROCESSING', 'COMPLETED', 'CANCELLED'];

  ngOnInit() {
    this.dashboardService.getConveyors().subscribe({
      next: res => {
        this.conveyors.set(res);
        this.isLoading.set(false);
      },
      error: err => {
        console.error('Failed to load conveyors:', err);
        this.isLoading.set(false);
      }
    });
  }
  validate(): boolean {
    const o = this.order();
    const newErrors: Record<string, string> = {};

    if (!o.name.trim()) newErrors['name'] = 'Order name cannot be empty';
    if (!o.product.trim()) newErrors['product'] = 'Product name cannot be empty';
    if (!o.status) newErrors['status'] = 'Status is required';
    if (o.quantity < 1) newErrors['quantity'] = 'Quantity must be at least 1';
    if (!o.conveyorId) newErrors['conveyorId'] = 'Conveyor must be selected';  // ← add this

    this.errors.set(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  freshOrder() {
    return {
      name: '',
      status: 'PENDING',
      product: '',
      quantity: 1,
      conveyorId: null as number | null
    };
  }

  updateField(field: string, value: any) {
    this.order.update(o => ({ ...o, [field]: value }));
    this.errors.update(e => ({ ...e, [field]: '' }));
  }

  save() {
    if (!this.validate()) return; // ← blocks if any field is empty
    this.dialogRef.close(this.order());
    this.order.set(this.freshOrder());
    this.errors.set({});
  }

  cancel() {
    this.order.set(this.freshOrder());
    this.dialogRef.close();
  }
}
