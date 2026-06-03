import { Component, Inject, OnInit, signal, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../Services/DashboardService';
import {Conveyor} from '../../models/conveyor.model';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ]
})
export class EditDialog implements OnInit {
  private dashboardService = inject(DashboardService);

  order: any;
  conveyors = signal<Conveyor[]>([]);
  statusOptions = ['PENDING', 'PROCESSING', 'COMPLETED', 'CANCELLED'];

  constructor(
    public dialogRef: MatDialogRef<EditDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.order = { ...data.order };
  }

  ngOnInit() {
    this.dashboardService.getConveyors().subscribe({
      next: res => this.conveyors.set(res),
      error: err => console.error('Failed to load conveyors:', err)
    });
  }

  save() { this.dialogRef.close(this.order); }
  cancel() { this.dialogRef.close(); }
}
