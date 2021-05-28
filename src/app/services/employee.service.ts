import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable} from 'rxjs'
// import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  // URL:string = environment.URL + '/api/employees';
  private baseURL = 'http://localhost:8080/api/employees';

  constructor(private http: HttpClient) { }
 
  getEmployees(): Observable<any>{
    return this.http.get(`${this.baseURL}`);
  }
}
