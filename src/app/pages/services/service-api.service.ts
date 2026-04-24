import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Service {
  id?: number;
  customer_name: string;
  license_plate: string;
  vehicle_model: string;
  vehicle_manufacturer: string;
  vehicle_year: number;
  complaint: string;
  status?: string;
  created_at?: string;
}

@Injectable({ providedIn: 'root' })
export class ServiceApiService {
  private readonly url = `${environment.apiUrl}/services/`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Service[]> {
    return this.http.get<Service[]>(this.url);
  }

  create(service: Service): Observable<Service> {
    return this.http.post<Service>(this.url, service);
  }

  update(id: number, service: Partial<Service>): Observable<Service> {
    return this.http.patch<Service>(`${this.url}${id}/`, service);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}${id}/`);
  }
}
