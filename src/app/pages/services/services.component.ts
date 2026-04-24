import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent {
  obdCodes = [
    { id: 'P0001', desc: 'Fuel Volume Regulator Control Circuit/Open' },
    { id: 'P0002', desc: 'Fuel Volume Regulator Control Circuit Range/Performance' },
    { id: 'P0003', desc: 'Fuel Volume Regulator Control Circuit Low' },
    { id: 'P0004', desc: 'Fuel Volume Regulator Control Circuit High' },
    { id: 'P0005', desc: 'Fuel Shutoff Valve Control Circuit/Open' },
    { id: 'P0006', desc: 'Fuel Shutoff Valve Control Circuit Low' },
    { id: 'P0007', desc: 'Fuel Shutoff Valve Control Circuit High' },
    { id: 'P0008', desc: 'Engine Position System Performance (Bank1)' }
  ];
}
