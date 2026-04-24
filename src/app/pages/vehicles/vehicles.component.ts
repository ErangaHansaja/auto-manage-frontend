import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleDialogComponent } from './vehicle-dialog.component';

@Component({
  selector: 'app-vehicles',
  standalone: true,
  imports: [CommonModule, VehicleDialogComponent],
  templateUrl: './vehicles.component.html',
  styleUrl: './vehicles.component.scss'
})
export class VehiclesComponent {
  showDialog = false;
  isLoading = false;
  errorMessage = '';

  vehicles = [
    { name: 'Toyota Camry', model: '2020', license_plate: 'XYZ-1234', is_active: true },
    { name: 'Honda Civic', model: '2022', license_plate: 'ABC-5678', is_active: true },
    { name: 'Ford Mustang', model: '2019', license_plate: 'LMN-9101', is_active: false }
  ];

  openDialog() { this.showDialog = true; }
  closeDialog() { this.showDialog = false; }
}
