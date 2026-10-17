export interface User {
    _id?: string;
    name: string;
    email: string;
}

export interface AuthCredentials {
    email: string;
    password: string;
}

export interface AuthResponse {
    token: string;
}
