import { Component, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

  suggestions = [
    "Find part by VIN",
    "Torque specs",
    "Wiring diagrams",
    "Repair guides"
  ];

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }

  selectSuggestion(suggestion: string) {
    this.userInput = suggestion;
    this.sendMessage();
  }

  sendMessage() {
    if (!this.userInput.trim()) return;

    this.isChatActive = true;
    this.chatHistory.push({ sender: 'user', text: this.userInput });
    
    const query = this.userInput;
    this.userInput = '';

    // Mock AI response for demo purposes
    setTimeout(() => {
      let response = "I can help with that. Please provide more details.";
      if (query.toLowerCase().includes("torque specs")) {
          response = "For a 2018 Toyota Camry, the wheel lug nut torque is...\n[and a structured, detailed list of values, maybe a small snippet of an annotated wheel diagram/table for visual aid].\n\nIs there anything else about this vehicle?";
      } else if (query.toLowerCase().includes("brake pad")) {
          response = "[Information about brake pad thickness]\nminimum replacement thickness is 1mm...";
      } else if (query.toLowerCase().includes("vin")) {
          response = "Please provide the 17-digit VIN number to proceed.";
      } else if (query.toLowerCase().includes("wiring diagrams")) {
          response = "Sure, I can pull up wiring diagrams. What system are you working on?";
      } else if (query.toLowerCase().includes("repair guides")) {
          response = "Which component's repair guide are you looking for?";
      }

      this.chatHistory.push({ sender: 'ai', text: response });
    }, 800);
  }
}
