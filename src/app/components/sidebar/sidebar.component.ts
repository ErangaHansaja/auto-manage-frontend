import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

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
        { label: 'Loyalty', icon: 'volunteer_activism', route: '/admin-mechanic-panel/loyalty' },
    ];
}
