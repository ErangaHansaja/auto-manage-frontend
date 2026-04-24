import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
    stats = [
        { label: 'Total Customers', value: '1,245', trend: '+12%', trendUp: true, icon: 'people' },
        { label: 'Active Appointments', value: '8', tag: 'Today', icon: 'calendar_today' },
        { label: 'Monthly Revenue', value: '$12,450', trend: '+5%', trendUp: true, icon: 'payments' },
        { label: 'Pending Services', value: '3', tag: 'Needs Action', tagWarning: true, icon: 'pending_actions' },
    ];

    recentActivity = [
        { title: 'Service Completed', desc: 'Vehicle Toyota Camry (LMX-99) final inspection done.', time: '10 mins ago', icon: 'check_circle', color: 'green' },
        { title: 'New Appointment', desc: 'Scheduled for Sarah Connor on Oct 24.', time: '30 mins ago', icon: 'event', color: 'blue' },
        { title: 'Payment Received', desc: 'Invoice #402 paid via Credit Card.', time: '1 hour ago', icon: 'attach_money', color: 'purple' },
        { title: 'Maintenance Started', desc: 'Technician Mike started work on Ford F-150.', time: '2 hours ago', icon: 'build', color: 'orange' },
    ];
}
