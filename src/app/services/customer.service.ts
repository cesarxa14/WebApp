import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private baseURL = 'http://localhost:8080/api/customers';

  constructor(private http: HttpClient) { }

  validateEmail(customer): Observable<any> {
    return this.http.post(`${this.baseURL}/validateEmail`, customer);
  }

  insertCustomer(customer): Observable<any> {
    return this.http.post(`${this.baseURL}`, customer);
  }
}
