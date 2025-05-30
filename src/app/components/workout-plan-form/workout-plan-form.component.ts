import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkoutPlanService, WorkoutPlan, WorkoutDay, ExerciseEntry, WeekDay } from '../../services/workout-plan.service';
import { ExercisesService } from '../../services/exercise.service';
import { Exercise as ExerciseOption } from '../../services/exercise.service';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-workout-plan-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './workout-plan-form.component.html'
})
export class WorkoutPlanFormComponent implements OnInit {
  plan: WorkoutPlan = {
    name: '',
    description: '',
    days: [],
    userId: ''
  };

  exercises: ExerciseOption[] = [];
  daysOfWeek: WeekDay[] = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];

  isEditMode = false;
  loading = false;
  error = '';
  id: string | null = null;

  constructor(
    private planService: WorkoutPlanService,
    private authService: AuthService,
    private exerciseService: ExercisesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const userId = this.authService.getUserId();
    if (userId) {
      this.plan.userId = userId;
    }

    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.isEditMode = true;
      this.planService.getPlanById(this.id).subscribe({
        next: (data) => {
          this.plan = {
            ...data,
            days: data.days.map(day => ({
              ...day,
              exercises: day.exercises.map(ex => ({
                ...ex,
                exerciseId: typeof ex.exerciseId === 'object' ? (ex.exerciseId as any)._id : ex.exerciseId
              }))
            }))
          };
        },
        error: () => this.error = 'Ошибка загрузки плана'
      });
    }

    this.exerciseService.getExercises().subscribe({
      next: (data) => this.exercises = data,
      error: () => this.error = 'Ошибка загрузки упражнений'
    });
  }

  addDay() {
    this.plan.days.push({ day: 'Понедельник', exercises: [] });
  }

  removeDay(index: number) {
    this.plan.days.splice(index, 1);
  }

  addExercise(dayIndex: number) {
    this.plan.days[dayIndex].exercises.push({
      exerciseId: '',
      sets: 3,
      reps: 10,
      rest: 60
    });
  }

  removeExercise(dayIndex: number, exIndex: number) {
    this.plan.days[dayIndex].exercises.splice(exIndex, 1);
  }

  onSubmit() {
    this.loading = true;

    const request = this.isEditMode && this.id
      ? this.planService.updatePlan(this.id, this.plan)
      : this.planService.createPlan(this.plan);

    request.subscribe({
      next: () => this.router.navigate(['/plans']),
      error: () => {
        this.error = 'Ошибка сохранения плана';
        this.loading = false;
      }
    });
  }
}
