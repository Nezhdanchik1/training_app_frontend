import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-profile-edit',
  standalone: true,
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

  constructor(private profileService: ProfileService, private router: Router) {}

  ngOnInit(): void {
    this.profileService.getProfile().subscribe((data: any) => {
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

    const updatedData: any = {
      username: this.user.username,
      email: this.user.email,
      avatarUrl: this.user.avatarUrl,
    };

    if (this.newPassword.trim() !== '') {
      updatedData.oldPassword = this.oldPassword;
      updatedData.password = this.newPassword;
    }

    this.profileService.updateProfile(this.user.id, updatedData).subscribe(() => {
      alert('Профиль обновлен!');
      this.router.navigate(['/profile']);
    }, error => {
      alert(error.error.message || 'Ошибка при обновлении профиля');
    });
  }
}
