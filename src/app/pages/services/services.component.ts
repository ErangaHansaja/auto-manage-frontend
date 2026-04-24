import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServiceDialogComponent } from './service-dialog.component';
import { ServiceApiService, Service } from './service-api.service';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, FormsModule, ServiceDialogComponent],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent implements OnInit {
  showDialog = false;
  isLoading = false;
  errorMessage = '';
  services: Service[] = [];

  constructor(private serviceApi: ServiceApiService) {}

  ngOnInit(): void {
    this.loadServices();
  }

  loadServices(): void {
    this.isLoading = true;
    this.serviceApi.getAll().subscribe({
      next: (data) => {
        this.services = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load services:', err);
        this.errorMessage = 'Failed to load services.';
        this.isLoading = false;
      }
    });
  }

  openDialog() { this.showDialog = true; }

  closeDialog(reload?: boolean) {
    this.showDialog = false;
    if (reload) this.loadServices();
  }
}
