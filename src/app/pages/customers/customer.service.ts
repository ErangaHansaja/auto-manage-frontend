import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Customer {
  id?: number;
  name: string;
  email: string;
  nic: string;
  mobile: string;
  address: string;
  is_active: boolean;
}

@Injectable({ providedIn: 'root' })
export class CustomerService {
  private readonly url = `${environment.apiUrl}/customers/`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.url);
  }

  create(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.url, customer);
  }

  update(id: number, customer: Partial<Customer>): Observable<Customer> {
    return this.http.patch<Customer>(`${this.url}${id}/`, customer);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}${id}/`);
  }
}
