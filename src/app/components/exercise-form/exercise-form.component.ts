import { Component, OnInit } from '@angular/core';
import { ExercisesService, Exercise } from '../../services/exercise.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-exercise-form',
  imports: [
    FormsModule, CommonModule
  ],
  templateUrl: './exercise-form.component.html',
})
export class ExerciseFormComponent implements OnInit {
  exercise: Exercise = {
    _id: '',
    name: '',
    muscleGroup: '',
    description: '',
    imageUrl: '',
  };

  isEditMode = false;
  exerciseId: string | null = null;
  loading = false;
  error = '';

  muscleGroups = ['Chest', 'Back', 'Legs', 'Arms', 'Shoulders', 'Core', 'Full Body'];

  constructor(
    private exercisesService: ExercisesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.exerciseId = this.route.snapshot.paramMap.get('id');
    if (this.exerciseId) {
      this.isEditMode = true;
      this.loadExercise();
    }
  }

  loadExercise() {
    this.loading = true;
    this.exercisesService.getExerciseById(this.exerciseId!).subscribe({
      next: (exercise) => {
        this.exercise = exercise;
        this.loading = false;
      },
      error: () => {
        this.error = 'Ошибка загрузки упражнения';
        this.loading = false;
      },
    });
  }

  onSubmit(form: any) {
    if (!form.valid) {
      return;
    }

    this.loading = true;
    if (this.isEditMode && this.exerciseId) {
      this.exercisesService.updateExercise(this.exerciseId, this.exercise).subscribe({
        next: () => this.router.navigate(['/exercises']),
        error: () => {
          this.error = 'Ошибка при обновлении упражнения';
          this.loading = false;
        },
      });
    } else {
      this.exercisesService.createExercise(this.exercise).subscribe({
        next: () => this.router.navigate(['/exercises']),
        error: () => {
          this.error = 'Ошибка при создании упражнения';
          this.loading = false;
        },
      });
    }
  }
}
