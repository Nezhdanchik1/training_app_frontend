import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ExercisesListComponent } from './components/exercises-list/exercises-list.component';
import { ExerciseFormComponent } from './components/exercise-form/exercise-form.component';
import { ExerciseDetailComponent } from './components/exercise-detail/exercise-detail.component';
import { ExerciseEditComponent } from './components/exercise-edit/exercise-edit.component';
import { WorkoutPlanListComponent } from './components/workout-plan-list/workout-plan-list.component';
import { WorkoutPlanFormComponent } from './components/workout-plan-form/workout-plan-form.component';
import { WorkoutPlanDetailComponent } from './components/workout-plan-detail/workout-plan-detail.component';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';
import { AuthGuard } from './guard/auth.guard';

export const routes: Routes = [
    // 👇 Маршруты БЕЗ layout
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // 👇 Маршруты С layout
  {
    path: '',
    component: LayoutComponent, canActivate: [AuthGuard],
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'profile/edit', component: ProfileEditComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'exercises', component: ExercisesListComponent },
      { path: 'exercises/new', component: ExerciseFormComponent },
      { path: 'exercises/:id', component: ExerciseDetailComponent },
      { path: 'exercises/edit/:id', component: ExerciseEditComponent },
      { path: 'plans', component: WorkoutPlanListComponent },              // 📋 список
      { path: 'plans/new', component: WorkoutPlanFormComponent },          // ➕ создание
      { path: 'plans/edit/:id', component: WorkoutPlanFormComponent },     // ✏️ редактирование
      { path: 'plans/:id', component: WorkoutPlanDetailComponent },        // 🔍 детально
    ]
  },

  // 👇 Редирект на login по умолчанию, если путь не найден
  { path: '**', redirectTo: 'login' }
];
