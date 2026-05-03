import { Injectable, signal, PLATFORM_ID, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  isLoggedIn = signal<boolean>(this.hasToken());
  userRole = signal<string>(this.getRole());

  constructor(private http: HttpClient, private router: Router) {}

  register(email: string, password: string) {
    return this.http.post(`${this.apiUrl}/register`, { email, password });
  }

  login(email: string, password: string) {
    return this.http.post<{ token: string; role: string }>(`${this.apiUrl}/login`, { email, password });
  }

  saveToken(token: string, role: string) {
    if (this.isBrowser) {
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
    }
    this.isLoggedIn.set(true);
    this.userRole.set(role);
  }

  logout() {
    if (this.isBrowser) {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
    }
    this.isLoggedIn.set(false);
    this.userRole.set('');
    this.router.navigate(['/login']);
  }

  getToken() {
    return this.isBrowser ? localStorage.getItem('token') : null;
  }

  isAdmin() {
    return this.userRole() === 'Admin';
  }

  private hasToken() {
    return this.isBrowser ? !!localStorage.getItem('token') : false;
  }

  private getRole() {
    return this.isBrowser ? localStorage.getItem('role') ?? '' : '';
  }
}