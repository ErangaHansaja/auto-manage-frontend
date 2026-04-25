import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceApiService } from './service-api.service';

@Component({
  selector: 'app-service-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './service-dialog.component.html',
  styleUrls: ['./service-dialog.component.scss']
})
export class ServiceDialogComponent {
  @Output() closeDialog = new EventEmitter<boolean>();

  serviceForm: FormGroup;
  isSubmitting = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private serviceApi: ServiceApiService) {
    this.serviceForm = this.fb.group({
      customer_name: ['', Validators.required],
      mechanic: ['', Validators.required],
      license_plate: ['', Validators.required],
      vehicle_model: ['', Validators.required],
      customer_request: ['', Validators.required]
    });
  }

  get f() {
    return this.serviceForm.controls;
  }

  onClose() {
    this.closeDialog.emit(false);
  }

  onSubmit() {
    if (this.serviceForm.invalid) {
      this.serviceForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    this.serviceApi.create(this.serviceForm.value).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.closeDialog.emit(true); // signal parent to reload
      },
      error: (err) => {
        this.isSubmitting = false;
        this.errorMessage = err?.error?.detail || 'Failed to create service. Please try again.';
      }
    });
  }
}
