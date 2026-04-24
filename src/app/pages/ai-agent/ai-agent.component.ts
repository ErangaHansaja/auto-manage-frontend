import { Component, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GeminiService, GeminiMessage } from './gemini.service';

interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
}

@Component({
  selector: 'app-ai-agent',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ai-agent.component.html',
  styleUrl: './ai-agent.component.scss'
})
export class AiAgentComponent implements AfterViewChecked {
  @ViewChild('chatContainer') private chatContainer!: ElementRef;

  userInput: string = '';
  chatHistory: ChatMessage[] = [];
  geminiHistory: GeminiMessage[] = [];
  isChatActive: boolean = false;
  isLoading: boolean = false;

  suggestions = [
    'Find part by VIN',
    'Torque specs',
    'Wiring diagrams',
    'Repair guides'
  ];

  constructor(private geminiService: GeminiService) {}

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }

  selectSuggestion(suggestion: string) {
    this.userInput = suggestion;
    this.sendMessage();
  }

  sendMessage() {
    const text = this.userInput.trim();
    if (!text || this.isLoading) return;

    // Show user message immediately
    this.isChatActive = true;
    this.chatHistory.push({ sender: 'user', text });
    this.userInput = '';
    this.isLoading = true;

    // Call Gemini API
    this.geminiService.sendMessage(this.geminiHistory, text).subscribe({
      next: (response) => {
        // Add to display history
        this.chatHistory.push({ sender: 'ai', text: response });

        // Update Gemini conversation history for context
        this.geminiHistory.push(
          { role: 'user', parts: [{ text }] },
          { role: 'model', parts: [{ text: response }] }
        );

        this.isLoading = false;
      },
      error: (err) => {
        console.error('Gemini API error:', err);
        this.chatHistory.push({
          sender: 'ai',
          text: 'Sorry, I encountered an error connecting to the AI service. Please check your API key and try again.'
        });
        this.isLoading = false;
      }
    });
  }
}
