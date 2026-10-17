
import {
	HttpInterceptorFn
} from '@angular/common/http';

export const jwtInterceptor: HttpInterceptorFn = (request, next) => {
	const token = localStorage.getItem('travlr-token');

	if (
		token &&
		request.url.startsWith('http://localhost:3000/api/') &&
		!request.url.endsWith('/login') &&
		!request.url.endsWith('/register')
	) {
		request = request.clone({
			setHeaders: {
				Authorization: `Bearer ${token}`
			}
		});
	}

	return next(request);
};
