import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { jwtDecode } from 'jwt-decode';

interface CustomJwtPayload {
  id: string;
  username: string;
  role: string;
  exp: number;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = `${environment.apiUrl}/api/auth`;
  private tokenKey = 'token';

  constructor(private http: HttpClient) {}

  register(data: any) {
    return this.http.post(`${this.api}/register`, data);
  }

  login(data: any) {
    return this.http.post<{ token: string }>(`${this.api}/login`, data);
  }

  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private decodeToken(): CustomJwtPayload | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      return jwtDecode<CustomJwtPayload>(token);
    } catch (e) {
      console.error('Ошибка при декодировании токена', e);
      return null;
    }
  }

  getUserId(): string | null {
    const payload = this.decodeToken();
    return payload?.id || null;
  }

  getUserRole(): string | null {
    const payload = this.decodeToken();
    return payload?.role || null;
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    const payload = this.decodeToken();
    if (!payload) return false;
    return payload.exp * 1000 > Date.now(); // exp в секундах
  }
}
