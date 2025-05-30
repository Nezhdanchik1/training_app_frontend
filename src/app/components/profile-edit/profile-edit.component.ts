import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';

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

  constructor(private userService: UserService, private location: Location) {}

  ngOnInit(): void {
    this.userService.getProfile().subscribe((data: any) => {
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

    this.userService.updateProfile(this.user.id, updatedData).subscribe(() => {
      alert('Профиль обновлен!');
      this.location.back();
    }, error => {
      alert(error.error.message || 'Ошибка при обновлении профиля');
    });
  }
}
