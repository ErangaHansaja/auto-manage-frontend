import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Vehicle {
  id?: number;
  name: string;
  model: string;
  manufacturer: string;
  year: number;
  license_plate: string;
  is_active: boolean;
  customer?: number;
}

@Injectable({ providedIn: 'root' })
export class VehicleService {
  private readonly url = `${environment.apiUrl}/vehicles/`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(this.url);
  }

  create(vehicle: Vehicle): Observable<Vehicle> {
    return this.http.post<Vehicle>(this.url, vehicle);
  }

  update(id: number, vehicle: Partial<Vehicle>): Observable<Vehicle> {
    return this.http.patch<Vehicle>(`${this.url}${id}/`, vehicle);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}${id}/`);
  }
}
