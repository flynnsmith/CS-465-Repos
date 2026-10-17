import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Trip } from '../models/trip';
import { AuthenticationService } from '../services/authentication.service';

@Component({
	selector: 'app-trip-card',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './trip-card.component.html',
	styleUrl: './trip-card.component.css'
})
export class TripCardComponent {
	@Input() trip!: Trip;

	public auth = inject(AuthenticationService);

	constructor(private router: Router) {}

	public editTrip(): void {
		this.router.navigate(['/edit-trip', this.trip.code]);
	}
}
