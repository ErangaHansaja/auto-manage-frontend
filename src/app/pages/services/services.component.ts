import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceDialogComponent } from './service-dialog.component';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, ServiceDialogComponent],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent {
  showDialog = false;

  services = [
    { customerName: 'Taylor Jewel', licensePlate: 'KSD- 921', vehicleModel: 'Toyota Corolla', complaint: 'Engine overheating...' },
    { customerName: 'Jeremy Fisher', licensePlate: 'CAD- 564', vehicleModel: 'Honda Civic', complaint: 'Air conditioning not...' },
    { customerName: 'Isabel Conklin', licensePlate: 'DSA-978', vehicleModel: 'Suzuki Alto', complaint: 'Unusual vibration while..' },
    { customerName: 'Damon Salvatore', licensePlate: 'KRS-746', vehicleModel: 'Nissan Sunny', complaint: 'Battery draining quickly...' },
    { customerName: 'Taylor Swift', licensePlate: 'TSW-235', vehicleModel: 'Hyundai Elantra', complaint: 'Fuel consumption...' }
  ];

  openDialog() {
    this.showDialog = true;
  }

  closeDialog() {
    this.showDialog = false;
  }
}
