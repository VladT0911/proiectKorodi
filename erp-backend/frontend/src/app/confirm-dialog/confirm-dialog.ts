import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './confirm-dialog.html',
  styleUrl: './confirm-dialog.css'
})
export class ConfirmDialog {
  private dialogRef = inject(MatDialogRef<ConfirmDialog>);

  confirm(): void {
    this.dialogRef.close(true); // 👈 sends true back to DialogBox
  }

  cancel(): void {
    this.dialogRef.close(false);
  }
}
