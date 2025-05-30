import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {}

  getProfile(): Observable<any> {
    const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };
    return this.http.get<any>(`${this.apiUrl}/profile`, { headers });
  }

  updateProfile(id: string, data: any): Observable<any> {
    const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };
    return this.http.put<any>(`${this.apiUrl}/${id}`, data, { headers });
  }
}
