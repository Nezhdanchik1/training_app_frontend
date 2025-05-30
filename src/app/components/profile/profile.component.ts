import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [RouterLink],
  templateUrl: './profile.component.html',
  standalone: true
})
export class ProfileComponent implements OnInit {
  username: string = '';
  avatarUrl: string = '';

  constructor(private profileService: ProfileService, private router: Router) {}

  ngOnInit(): void {
    this.profileService.getProfile().subscribe(user => {
      this.username = user.username;
      this.avatarUrl = user.avatarUrl;
    });
  }

  logout() {
    localStorage.removeItem('token'); // или другой ключ, где храните токен
    this.router.navigate(['/login']);
  }
}
