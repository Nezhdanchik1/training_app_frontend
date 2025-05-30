import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  avatarUrl: string = '';
  password: string = '';
  confirmPassword: string = '';
  role: string = 'user';

  errorMessage: string | null = null;
  successMessage: string | null = null;


  constructor(private authService: AuthService, private router: Router) {}

  register(): void {
  this.errorMessage = null;
  this.successMessage = null;

  if (!this.username.trim() || !this.email.trim() || !this.password.trim() || !this.confirmPassword.trim()) {
    this.errorMessage = 'Пожалуйста, заполните все обязательные поля.';
    return;
  }

  if (this.password !== this.confirmPassword) {
    this.errorMessage = 'Пароли не совпадают.';
    return;
  }

  if (!this.avatarUrl?.trim()) {
    this.avatarUrl = 'https://learn.ppkslavyanova.ru/wp-content/plugins/ultimate-member/assets/img/default_avatar.jpg';
  }

  this.authService.register({
    username: this.username,
    email: this.email,
    avatarUrl: this.avatarUrl,
    password: this.password,
    role: this.role
  }).subscribe({
    next: () => {
      this.successMessage = 'Регистрация прошла успешно!';
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 1500);
    },
    error: (error) => {
      if (error.status === 400) {
        this.errorMessage = error.error.message || 'Некорректные данные.';
      } else if (error.status === 409) {
        this.errorMessage = 'Пользователь с таким именем или email уже существует.';
      } else {
        this.errorMessage = 'Ошибка при регистрации. Попробуйте позже.';
      }
    }
  });
}

}
