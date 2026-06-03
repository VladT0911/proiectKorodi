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
  }

  save() {
    this.dialogRef.close(this.order());
    this.order.set(this.freshOrder());
  }

  cancel() {
    this.order.set(this.freshOrder());
    this.dialogRef.close();
  }
}
