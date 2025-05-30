import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkoutPlanService } from '../../services/workout-plan.service';
import { ExercisesService } from '../../services/exercise.service';
import { Exercise as ExerciseOption } from '../../services/exercise.service';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Интерфейсы
interface Exercise {
  exerciseId: string | { _id: string };
  sets: number;
  reps: number;
  rest: number;
}

interface WorkoutDay {
  day: string;
  exercises: Exercise[];
}

interface WorkoutPlan {
  name: string;
  description: string;
  days: WorkoutDay[];
}

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
    days: []
  };

  exercises: ExerciseOption[] = [];
  daysOfWeek = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];

  isEditMode = false;
  loading = false;
  error = '';
  id: string | null = null;

  constructor(
    private planService: WorkoutPlanService,
    private exerciseService: ExercisesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.isEditMode = true;
      this.planService.getPlanById(this.id).subscribe({
        next: (data: WorkoutPlan) => {
          this.plan = data;

          this.plan.days.forEach((day: WorkoutDay) => {
            day.exercises.forEach((ex: Exercise) => {
              if (typeof ex.exerciseId === 'object' && ex.exerciseId !== null) {
                ex.exerciseId = ex.exerciseId._id;
              }
            });
          });
        },
        error: () => this.error = 'Ошибка загрузки плана'
      });
    }

    this.exerciseService.getExercises().subscribe({
      next: (data: ExerciseOption[]) => this.exercises = data,
      error: () => this.error = 'Ошибка загрузки упражнений'
    });
  }

  addDay() {
    this.plan.days.push({ day: '', exercises: [] });
  }

  addExercise(dayIndex: number) {
    this.plan.days[dayIndex].exercises.push({
      exerciseId: '',
      sets: 3,
      reps: 10,
      rest: 60
    });
  }

  removeDay(index: number) {
    this.plan.days.splice(index, 1);
  }

  removeExercise(dayIndex: number, exIndex: number) {
    this.plan.days[dayIndex].exercises.splice(exIndex, 1);
  }

  onSubmit() {
    this.loading = true;
    const request = this.isEditMode
      ? this.planService.updatePlan(this.id!, this.plan)
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
