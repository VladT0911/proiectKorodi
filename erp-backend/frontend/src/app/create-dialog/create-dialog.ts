import { Component } from '@angular/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
  ]
})
export class CreateDialog {
  order = this.freshOrder();

  statusOptions = ['Pending', 'Processing', 'Completed', 'Cancelled'];

  constructor(public dialogRef: MatDialogRef<CreateDialog>) {}
  freshOrder() {
    return {
      name: '',
      status: 'Pending',
      product: '',
      quantity: 1,
      createdAt: Date.now()
    };
  }

  save() {
    this.dialogRef.close(this.order);
    this.order = this.freshOrder();
  }

  cancel() {
    this.order = this.freshOrder();
    this.dialogRef.close();
  }
}
