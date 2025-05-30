// workout-plan-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkoutPlanService } from '../../services/workout-plan.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-workout-plan-detail',
  imports: [
    CommonModule
  ],
  templateUrl: './workout-plan-detail.component.html'
})
export class WorkoutPlanDetailComponent implements OnInit {
  plan: any;
  loading = false;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private planService: WorkoutPlanService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loading = true;
      this.planService.getPlanById(id).subscribe({
        next: (data) => {
          this.plan = data;
          this.loading = false;
        },
        error: () => {
          this.error = 'Не удалось загрузить план';
          this.loading = false;
        }
      });
    }
  }

  goToEdit() {
    this.router.navigate(['/plans/edit', this.plan._id]);
  }

  goBack() {
    this.router.navigate(['/plans']);
  }
}
