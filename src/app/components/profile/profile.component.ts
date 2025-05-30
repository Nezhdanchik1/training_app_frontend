import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [RouterLink, CommonModule],
  templateUrl: './profile.component.html',
  standalone: true
})
export class ProfileComponent implements OnInit {
  username: string = '';
  role: string = '';
  avatarUrl: string = '';

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.getProfile().subscribe(user => {
      this.username = user.username;
      this.role = user.role;
      this.avatarUrl = user.avatarUrl;
    });
  }

  logout() {
    localStorage.removeItem('token'); // или другой ключ, где храните токен
    this.router.navigate(['/login']);
  }
}
