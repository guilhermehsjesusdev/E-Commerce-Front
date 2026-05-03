import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = `${environment.apiUrl}/users`;
  private http = inject(HttpClient);

  getAll() {
    return this.http.get<User[]>(this.apiUrl);
  }

  promote(userId: string) {
    return this.http.patch(`${this.apiUrl}/${userId}/promote`, {});
  }

  demote(userId: string) {
    return this.http.patch(`${this.apiUrl}/${userId}/demote`, {});
  }
}