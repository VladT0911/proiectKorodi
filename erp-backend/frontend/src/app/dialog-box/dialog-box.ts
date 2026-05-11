import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ConfirmDialog } from '../confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-dialog-box',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatDialogModule],
  templateUrl: './dialog-box.html',
  styleUrl: './dialog-box.css'
})
export class DialogBox {
  private dialog = inject(MatDialog);
  private dialogRef = inject(MatDialogRef<DialogBox>);

  onCreateOrder(): void {
    const confirmRef = this.dialog.open(ConfirmDialog, {
      width: '300px',
      data: {
        title: 'Create Order',
        message: 'Are you sure you want to create this order?'
      }
    });

    confirmRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.createOrder();
      }
    });
  }

  createOrder(): void {
    console.log('Order created!');
    this.dialogRef.close(true); // 👈 this tells Dashboard to reload orders
  }
}
