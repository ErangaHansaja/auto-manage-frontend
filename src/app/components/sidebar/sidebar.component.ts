import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/auth.service';

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
    menuItems = [
        { label: 'Dashboard', icon: 'grid_view', route: '/admin-mechanic-panel/dashboard' },
        { label: 'Customers', icon: 'groups', route: '/admin-mechanic-panel/customers' },
        { label: 'Vehicles', icon: 'directions_car', route: '/admin-mechanic-panel/vehicles' },
        { label: 'Services', icon: 'settings', route: '/admin-mechanic-panel/services' },
        { label: 'AI Agent', icon: 'smart_toy', route: '/admin-mechanic-panel/ai-agent' },
    ];

    constructor(private authService: AuthService) {}

    logout(): void {
        this.authService.logout();
    }
}
