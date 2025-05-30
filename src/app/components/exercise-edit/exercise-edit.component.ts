import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ExercisesService, Exercise } from '../../services/exercise.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-exercise-edit',
  imports: [
    CommonModule, FormsModule
  ],
  templateUrl: './exercise-edit.component.html',
})
export class ExerciseEditComponent implements OnInit {
  exercise: Exercise = {
    _id: '',
    name: '',
    muscleGroup: '',
    description: '',
    imageUrl: '',
  };
  muscleGroups = ['Chest', 'Back', 'Legs', 'Arms', 'Shoulders', 'Core', 'Full Body'];
  loading = false;
  error = '';
  isEditMode = false;

  constructor(
    private exercisesService: ExercisesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.loadExercise(id);
    }
  }

  loadExercise(id: string) {
    this.loading = true;
    this.exercisesService.getExerciseById(id).subscribe({
      next: (data) => {
        this.exercise = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Не удалось загрузить упражнение';
        this.loading = false;
      },
    });
  }

  onSubmit() {
    this.error = '';
    this.loading = true;

    if (this.isEditMode && this.exercise._id) {
      this.exercisesService.updateExercise(this.exercise._id, this.exercise).subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/exercises']);
        },
        error: () => {
          this.error = 'Ошибка при обновлении упражнения';
          this.loading = false;
        },
      });
    } else {
      // Если вдруг нужен режим создания — добавь сюда логику создания
    }
  }
}
