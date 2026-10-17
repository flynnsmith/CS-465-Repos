
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

import {
	AuthCredentials,
	AuthResponse
} from '../models/user';

@Injectable({
	providedIn: 'root'
})
export class AuthenticationService {
	private http = inject(HttpClient);
	private router = inject(Router);

	private apiUrl = 'http://localhost:3000/api';

	public login(
		credentials: AuthCredentials
	): Observable<AuthResponse> {
		return this.http.post<AuthResponse>(
			`${this.apiUrl}/login`,
			credentials
		).pipe(
			tap(response => {
				localStorage.setItem(
					'travlr-token',
					response.token
				);
			})
		);
	}

	public getToken(): string | null {
		return localStorage.getItem('travlr-token');
	}

	public isLoggedIn(): boolean {
		const token = this.getToken();

		if (!token) {
			return false;
		}

		try {
			const payload = JSON.parse(
				atob(token.split('.')[1])
			);

			return payload.exp * 1000 > Date.now();
		} catch {
			return false;
		}
	}

	public logout(): void {
		localStorage.removeItem('travlr-token');
		this.router.navigate(['/login']);
	}
}
