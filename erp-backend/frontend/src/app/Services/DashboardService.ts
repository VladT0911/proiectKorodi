import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private url = 'http://localhost:8083';
  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    return this.http.get<any>(`${this.url}/orders`);
  }
  updateData(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.url}/orders/${id}`, data);
  }

}
