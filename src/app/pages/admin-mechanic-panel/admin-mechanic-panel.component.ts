import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
    selector: 'app-admin-mechanic-panel',
    standalone: true,
    imports: [CommonModule, RouterOutlet, SidebarComponent],
    templateUrl: './admin-mechanic-panel.component.html',
    styleUrl: './admin-mechanic-panel.component.scss'
})
export class AdminMechanicPanelComponent { }
