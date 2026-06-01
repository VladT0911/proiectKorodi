import {Component, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-erp-page',
  standalone: true,
  imports: [RouterOutlet, MatButtonModule, MatCardModule, MatIconModule],
  templateUrl: './erp-page.html',
  styleUrl: './erp-page.css'
})
export class ErpPage {
  protected readonly title = signal('frontend');
}
