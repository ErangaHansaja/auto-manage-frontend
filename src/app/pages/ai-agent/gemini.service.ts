import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface GeminiMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

// Shape of the request body sent to Django AssistView
interface AssistRequest {
  message: string;
  history: { role: string; content: string }[];
}

// Shape of the response from Django AssistView
// Adjust the field names below if your view returns different keys
interface AssistResponse {
  response?: string;   // most common
  message?: string;    // alternative
  reply?: string;      // alternative
  answer?: string;     // alternative
}

@Injectable({
  providedIn: 'root'
})
export class GeminiService {
  // Routes through your Django backend — JWT token is attached by auth interceptor
  private readonly API_URL = `${environment.apiUrl}/ai-assistant/`;

  constructor(private http: HttpClient) {}

  sendMessage(history: GeminiMessage[], userMessage: string): Observable<string> {
    // Convert Gemini-format history to a simple role/content format for Django
    const formattedHistory = history.map(h => ({
      role: h.role === 'model' ? 'assistant' : 'user',
      content: h.parts[0]?.text ?? ''
    }));

    const body: AssistRequest = {
      message: userMessage,
      history: formattedHistory
    };

    return this.http.post<AssistResponse>(this.API_URL, body).pipe(
      map(res => {
        // Try all common response field names
        const text = res.response ?? res.message ?? res.reply ?? res.answer;
        if (!text) {
          console.warn('AssistView response structure unexpected:', res);
          return 'Received a response but could not read it. Check the console for details.';
        }
        return text;
      })
    );
  }
}
