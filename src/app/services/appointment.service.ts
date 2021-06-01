import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private baseURL = 'http://localhost:8080/api/appointments';
  constructor(private http: HttpClient) { }

  getAppointmentByIDEmployee(id: number): Observable<any>{
    return this.http.get(`${this.baseURL}/searchByIdEmployee/${id}`);
  }

  getAppointmentByIDCustomer(id: number): Observable<any>{
    return this.http.get(`${this.baseURL}/searchByIdCustomer/${id}`)
  }
}
