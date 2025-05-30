import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile-edit',
  imports: [CommonModule, FormsModule],
  templateUrl: './profile-edit.component.html',
})
export class ProfileEditComponent implements OnInit {
  user: any = {
    id: '',
    username: '',
    email: '',
    avatarUrl: ''
  };
  oldPassword: string = '';
  newPassword: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.get('http://localhost:3000/api/users/profile', { headers }).subscribe((data: any) => {
      this.user = data;
    });
  }

  updateProfile(): void {
    if (this.newPassword.trim() !== '') {
      if (this.oldPassword.trim() === '') {
        alert('Для смены пароля нужно ввести старый пароль');
        return;
      }
      if (this.oldPassword === this.newPassword) {
        alert('Новый пароль не должен совпадать со старым');
        return;
      }
    }

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const updatedData: any = {
      username: this.user.username,
      email: this.user.email,
      avatarUrl: this.user.avatarUrl,
    };

    if (this.newPassword.trim() !== '') {
      updatedData.oldPassword = this.oldPassword;
      updatedData.password = this.newPassword;
    }

    this.http.put(`http://localhost:3000/api/users/${this.user.id}`, updatedData, { headers }).subscribe(() => {
      alert('Профиль обновлен!');
      this.router.navigate(['/profile']);
    }, error => {
      alert(error.error.message || 'Ошибка при обновлении профиля');
    });
  }
}
