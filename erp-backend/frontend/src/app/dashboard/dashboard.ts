import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardService} from "../Services/DashboardService";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
  })
export class Dashboard implements OnInit{
  orders:any[]=[];
  constructor(private dataService:DashboardService) {
    }
  ngOnInit()
  {
    this.dataService.getData().subscribe(response=>{
      console.log('Response:',response);
      this.orders=response;
    });



  }
}
