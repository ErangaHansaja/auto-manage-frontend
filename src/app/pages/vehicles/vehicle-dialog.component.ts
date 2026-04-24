import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vehicle-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vehicle-dialog.component.html',
  styleUrls: ['./vehicle-dialog.component.scss']
})
export class VehicleDialogComponent {
  @Output() closeDialog = new EventEmitter<void>();

  onClose() {
    this.closeDialog.emit();
  }
}
