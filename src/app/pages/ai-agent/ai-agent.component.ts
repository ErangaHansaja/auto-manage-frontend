import { Component, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AiAssistantService } from './gemini.service';

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
  isChatActive: boolean = false;
  isLoading: boolean = false;

  suggestions = [
    'My bike has a fuel leak',
    'Engine overheating issue',
    'Brake noise diagnosis',
    'Car won\'t start — battery or alternator?'
  ];

  constructor(private aiService: AiAssistantService) {}

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

    // Send to BE AI assistant endpoint
    this.aiService.sendMessage(text).subscribe({
      next: (response) => {
        this.chatHistory.push({ sender: 'ai', text: response });
        this.isLoading = false;
      },
      error: (err) => {
        console.error('AI assistant error:', err);
        this.chatHistory.push({
          sender: 'ai',
          text: 'Sorry, I encountered an error connecting to the AI service. Please try again.'
        });
        this.isLoading = false;
      }
    });
  }
}
