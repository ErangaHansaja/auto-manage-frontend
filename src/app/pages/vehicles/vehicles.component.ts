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
  vehicles = [
    { name: 'Toyota Camry', model: '2020', plate: 'XYZ-1234', status: 'Active' },
    { name: 'Honda Civic', model: '2022', plate: 'ABC-5678', status: 'Active' },
    { name: 'Ford Mustang', model: '2019', plate: 'LMN-9101', status: 'Inactive' }
  ];

  openDialog() {
    this.showDialog = true;
  }

  closeDialog() {
    this.showDialog = false;
  }
}
