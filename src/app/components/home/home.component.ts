import { Component, OnInit } from '@angular/core';
import { ExercisesService } from '../../services/exercise.service';
import { CommonModule } from '@angular/common';
import { Exercise } from '../../services/exercise.service';
import { RouterLink } from '@angular/router';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  username = '';
  recommendedExercises: Exercise[] = [];
  defaultImage = 'https://learn.ppkslavyanova.ru/wp-content/plugins/ultimate-member/assets/img/default_avatar.jpg';
  loadingExercises = false;
  errorExercises = '';

  constructor(
    private profileService: ProfileService,
    private exercisesService: ExercisesService
  ) {}

  ngOnInit(): void {
    this.loadRecommendedExercises();
    this.profileService.getProfile().subscribe(user => {
      this.username = user.username;
    });
  }

  loadRecommendedExercises() {
    this.loadingExercises = true;
    this.errorExercises = '';
    this.exercisesService.getExercises().subscribe({
      next: (exercises) => {
        this.recommendedExercises = exercises.slice(0, 3);
        this.loadingExercises = false;
      },
      error: (err) => {
        this.errorExercises = 'Не удалось загрузить рекомендуемые упражнения';
        this.recommendedExercises = [];
        this.loadingExercises = false;
        console.error(err);
      }
    });
  }
}
