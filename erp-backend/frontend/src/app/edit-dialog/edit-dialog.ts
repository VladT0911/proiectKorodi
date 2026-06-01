import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef,MatDialogModule} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-dialog',
  imports: [ CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,],
  templateUrl: './edit-dialog.html',
  styleUrl: './edit-dialog.css',
})
export class EditDialog {
  order: any;

  statusOptions = ['Pending', 'Processing', 'Completed', 'Cancelled'];
  constructor(
    public dialogRef: MatDialogRef<EditDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.order = { ...data.order }; // copy to avoid mutating original
  }
  save() {
    this.dialogRef.close(this.order); // send edited order back
  }

  cancel() {
    this.dialogRef.close();
  }
}
