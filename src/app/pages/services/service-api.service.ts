import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';

// Matches the Django Service model
export interface Service {
  id?: number;
  customer_name: string;
  mechanic: string;
  license_plate: string;
  vehicle_model: string;
  customer_request: string;
  created_at?: string;
  updated_at?: string;
  deleted?: boolean;
}

// BE response envelope
export interface ServiceListResponse {
  success: boolean;
  message: string;
  data: Service[];
}

export interface ServiceCreateResponse {
  success: boolean;
  message: string;
  data: Service;
}

@Injectable({ providedIn: 'root' })
export class ServiceApiService {
  private readonly url = `${environment.apiUrl}/service/book_service`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Service[]> {
    return this.http.get<ServiceListResponse>(this.url).pipe(
      map(res => res.data)
    );
  }

  create(service: Service): Observable<Service> {
    return this.http.post<ServiceCreateResponse>(this.url, service).pipe(
      map(res => res.data)
    );
  }
}
