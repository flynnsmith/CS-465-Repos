
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../services/authentication.service';

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [CommonModule, FormsModule],
	templateUrl: './login.component.html',
	styleUrl: './login.component.css'
})
export class LoginComponent {
	private auth = inject(AuthenticationService);
	private router = inject(Router);

	credentials = {
		email: '',
		password: ''
	};

	errorMessage = '';
	submitting = false;

	onLogin(): void {
		this.errorMessage = '';
		this.submitting = true;

		this.auth.login(this.credentials).subscribe({
			next: () => {
				this.submitting = false;
				this.router.navigate(['/']);
			},
			error: () => {
				this.submitting = false;
				this.errorMessage = 'Invalid email or password.';
			}
		});
	}
}
