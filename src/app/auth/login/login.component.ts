import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.errorMessage = null;

    if (!this.username.trim() || !this.password.trim()) {
      this.errorMessage = 'Пожалуйста, введите имя пользователя и пароль.';
      return;
    }

    const credentials = {
      username: this.username,
      password: this.password
    };

    this.authService.login(credentials).subscribe({
      next: (response) => {
        this.authService.saveToken(response.token);
        const role = this.authService.getUserRole();
        console.log(role)

        if (role === 'ADMIN') {
          this.router.navigate(['/admin/users']);
        } else {
          this.router.navigate(['/home']);
        }
      },
      error: (error) => {
        if (error.status === 401) {
          this.errorMessage = 'Неверное имя пользователя или пароль.';
        } else {
          this.errorMessage = 'Ошибка входа. Попробуйте позже.';
        }
      }
    });
  }
}
