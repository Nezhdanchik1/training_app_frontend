import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean | UrlTree {
    const token = localStorage.getItem('token');
    if (token) {
      // Токен есть — разрешаем доступ
      return true;
    } else {
      // Токена нет — перенаправляем на страницу логина
      return this.router.createUrlTree(['/login']);
    }
  }
}
