import { Component, OnInit } from '@angular/core';
import { WorkoutPlanService } from '../../services/workout-plan.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service'; // Убедись, что есть такой сервис

@Component({
  selector: 'app-workout-plans',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './workout-plan-list.component.html'
})
export class WorkoutPlanListComponent implements OnInit {
  plans: any[] = [];
  loading = false;
  error = '';
  filter: 'my' | 'public' = 'my'; // Фильтр по умолчанию

  constructor(
    private planService: WorkoutPlanService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.fetchPlans();
  }

  setFilter(filter: 'my' | 'public') {
    this.filter = filter;
    this.fetchPlans();
  }

  fetchPlans() {
    this.loading = true;
    this.error = '';
    const userId = this.authService.getUserId(); // получаем ID пользователя из токена

    if (this.filter === 'my') {
      if (!userId) {
        this.error = 'Вы не авторизованы';
        this.loading = false;
        return;
      }
      this.planService.getPlansByUser(userId).subscribe({
        next: (data) => {
          this.plans = data;
          this.loading = false;
        },
        error: () => {
          this.error = 'Ошибка при загрузке ваших планов';
          this.loading = false;
        }
      });
    } else {
      this.planService.getPublicPlans().subscribe({
        next: (data) => {
          this.plans = data;
          this.loading = false;
        },
        error: () => {
          this.error = 'Ошибка при загрузке готовых планов';
          this.loading = false;
        }
      });
    }
  }

  goToDetail(id: string) {
    this.router.navigate(['/plans', id]);
  }
}
