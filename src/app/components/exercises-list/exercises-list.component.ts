import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Exercise, ExercisesService } from '../../services/exercise.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-exercises-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './exercises-list.component.html',
})
export class ExercisesListComponent implements OnInit {
  exercises: Exercise[] = [];
  filteredExercises: Exercise[] = [];
  muscleGroups: string[] = ['Chest', 'Back', 'Legs', 'Arms', 'Shoulders', 'Core', 'Full Body'];
  selectedGroup: string = '';

  role = '';
  loading = false;
  error = '';

  constructor(private exercisesService: ExercisesService, private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.loadExercises();
    this.userService.getProfile().subscribe(user => {
      this.role = user.role;
    });
  }

  loadExercises() {
    this.loading = true;
    this.exercisesService.getExercises().subscribe({
      next: (data: Exercise[]) => {
        this.exercises = data;
        this.applyFilter();
        this.loading = false;
      },
      error: () => {
        this.error = 'Ошибка загрузки упражнений';
        this.loading = false;
      },
    });
  }

  applyFilter() {
    this.filteredExercises = this.selectedGroup
      ? this.exercises.filter(e => e.muscleGroup === this.selectedGroup)
      : this.exercises;
  }

  filterByGroup(group: string) {
    this.selectedGroup = group;
    this.applyFilter();
  }

  goToDetail(id: string) {
    this.router.navigate(['/exercises', id]);
  }

}
