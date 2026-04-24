import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerDialogComponent } from './customer-dialog.component';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule, CustomerDialogComponent],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss'
})
export class CustomersComponent {
  showDialog = false;
  customers = [
    { name: 'John Doe', email: 'john.doe@example.com', mobile: '+1 234 567 8900', status: 'Active' },
    { name: 'Jane Smith', email: 'jane.smith@example.com', mobile: '+1 987 654 3210', status: 'Active' },
    { name: 'Michael Johnson', email: 'michael.j@example.com', mobile: '+1 555 123 4567', status: 'Inactive' }
  ];

  openDialog() {
    this.showDialog = true;
  }

  closeDialog() {
    this.showDialog = false;
  }
}
