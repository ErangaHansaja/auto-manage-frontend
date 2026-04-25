import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';

// BE response envelope from AssistView
interface AssistResponse {
  success: boolean;
  message: string;
  response: string;
}

@Injectable({
  providedIn: 'root'
})
export class AiAssistantService {
  // Correct endpoint — uses underscore as per Django URL config
  private readonly API_URL = `${environment.apiUrl}/ai_assistant/`;

  constructor(private http: HttpClient) {}

  sendMessage(userMessage: string): Observable<string> {
    // BE expects: { "customer_request": "<text>" }
    const body = { customer_request: userMessage };

    return this.http.post<AssistResponse>(this.API_URL, body).pipe(
      map(res => {
        if (res.success && res.response) {
          return res.response;
        }
        // Fallback in case success is false but message is set
        return res.message ?? 'The AI assistant could not generate a response.';
      })
    );
  }
}
