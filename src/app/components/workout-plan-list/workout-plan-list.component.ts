// workout-plans.component.ts
import { Component, OnInit } from '@angular/core';
import { WorkoutPlanService } from '../../services/workout-plan.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-workout-plans',
  imports: [
    CommonModule, RouterLink
  ],
  templateUrl: './workout-plan-list.component.html'
})
export class WorkoutPlanListComponent implements OnInit {
  plans: any[] = [];
  loading = false;
  error = '';

  constructor(private planService: WorkoutPlanService, private router: Router) {}

  ngOnInit() {
    this.loading = true;
    this.planService.getAllPlans().subscribe({
      next: (data) => {
        this.plans = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Ошибка при загрузке планов';
        this.loading = false;
      }
    });
  }

  goToDetail(id: string) {
    this.router.navigate(['/plans', id]);
  }
}
