import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';

export interface LoginPayload {
  username: string;
  password: string;
}

// BE response envelope
export interface LoginApiResponse {
  success: boolean;
  message: string;
  data: {
    access: string;
    refresh: string;
  };
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly baseUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) {}

  login(payload: LoginPayload): Observable<LoginApiResponse> {
    return this.http.post<LoginApiResponse>(`${this.baseUrl}/auth/login/`, payload).pipe(
      map(res => {
        if (res.success) {
          localStorage.setItem('access_token', res.data.access);
          localStorage.setItem('refresh_token', res.data.refresh);
        }
        return res;
      })
    );
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
