import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-user-management',
  imports: [
    CommonModule
  ],
  templateUrl: './admin-user-management.component.html',
})
export class AdminUserManagementComponent implements OnInit {
  users: User[] = [];
  loading = false;
  error = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers() {
    this.loading = true;
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data.filter(user => user.role !== 'ADMIN');
        this.loading = false;
      },
      error: () => {
        this.error = 'Ошибка при загрузке пользователей';
        this.loading = false;
      }
    });
  }

  changeRole(user: User, newRole: 'USER' | "COACH") {
    if (user.role === newRole) return;
    this.userService.updateUserRole(user._id, newRole).subscribe({
      next: () => {
        user.role = newRole;
      },
      error: () => {
        alert('Ошибка при изменении роли');
      }
    });
  }

  deleteUser(userId: string) {
    if (!confirm('Вы уверены, что хотите удалить пользователя?')) return;
    this.userService.deleteUser(userId).subscribe({
      next: () => {
        this.users = this.users.filter(u => u._id !== userId);
      },
      error: () => {
        alert('Ошибка при удалении пользователя');
      }
    });
  }
}
