import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon'
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule, MatDialog} from '@angular/material/dialog';
import {ConfirmDialog} from '../confirm-dialog/confirm-dialog';


@Component({
  selector: 'app-dialog-box',
  standalone: true,
  imports: [MatButtonModule,MatIconModule,MatFormFieldModule,MatInputModule,MatDialogModule],
  templateUrl: './dialog-box.html',
  styleUrl: './dialog-box.css',
})
export class DialogBox {
  constructor(private dialog: MatDialog){}
  onCreateOrder(){
   const dialogRef=this.dialog.open(ConfirmDialog,{
      width:'300px',
      data:{
        title:"Confirm Order",
        message:' Are you sure you want to create this order?'}
        });

      dialogRef.afterClosed().subscribe(result => {
        if(result===true) {
        this.createOrder();
          }
        });
      }


        createOrder(){
          console.log('Order created!');
         }
    }

