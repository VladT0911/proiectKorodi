import { Component, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { DialogBox } from './dialog-box/dialog-box'
import { MatDialog } from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {Dashboard} from "./dashboard/dashboard";


@Component({
  selector: 'app-root',
  standalone:true,
  imports: [RouterOutlet,MatButtonModule,MatCardModule,MatIconModule,Dashboard],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');
  readonly dialog=inject(MatDialog);
  openDialog():void{
    this.dialog.open(DialogBox)}


}
