import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExercisesService, Exercise } from '../../services/exercise.service';
import { CommonModule, Location } from '@angular/common';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-exercise-detail',
  imports: [
    CommonModule
  ],
  templateUrl: './exercise-detail.component.html',
})
export class ExerciseDetailComponent implements OnInit {
  exercise: Exercise | null = null;
  role: string = '';
  loading = false;
  error = '';

  constructor(
    private exercisesService: ExercisesService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadExercise(id);
    }

    this.userService.getProfile().subscribe(user => {
      this.role = user.role;
    });
  }

  loadExercise(id: string) {
    this.loading = true;
    this.exercisesService.getExerciseById(id).subscribe({
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

  goToEdit() {
    if (this.exercise && this.exercise._id) {
      this.router.navigate(['/exercises/edit', this.exercise._id]);
    }
  }

  deleteExercise(id: string) {
    if (confirm('Удалить упражнение?')) {
      this.exercisesService.deleteExercise(id).subscribe({
        next: () => {
          alert('Упражнение удалено');
          this.location.back();
        },
        error: () => {
          alert('Ошибка при удалении упражнения');
        }
      });
    }
  }

  goBack() {
    this.location.back();
  }
}
