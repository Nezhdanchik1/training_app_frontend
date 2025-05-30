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
import { AdminRoleGuard } from './guard/admin-role.guard';

import { AdminUserManagementComponent } from './components/admin-user-management/admin-user-management.component'
import { AdminLayoutComponent } from './components/layout/admin-layout.component';
import { CoachRoleGuard } from './guard/coach-role.guard';

export const routes: Routes = [
  // ❗️Публичные маршруты
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'profile/edit', component: ProfileEditComponent },

      // 💪 Упражнения
      { path: 'exercises', component: ExercisesListComponent },
      { path: 'exercises/new', component: ExerciseFormComponent, canActivate: [CoachRoleGuard] },
      { path: 'exercises/:id', component: ExerciseDetailComponent },
      { path: 'exercises/edit/:id', component: ExerciseEditComponent, canActivate: [CoachRoleGuard] },

      // 📝 Планы тренировок
      { path: 'plans', component: WorkoutPlanListComponent },
      { path: 'plans/new', component: WorkoutPlanFormComponent },
      { path: 'plans/edit/:id', component: WorkoutPlanFormComponent },
      { path: 'plans/:id', component: WorkoutPlanDetailComponent },
    ]
  },

  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AdminRoleGuard, AuthGuard],
    children: [
      {
        path: 'admin/users', component: AdminUserManagementComponent },
      { path: 'admin/profile', component: ProfileComponent },
      { path: 'admin/profile/edit', component: ProfileEditComponent },
    ]
  },

  { path: '**', redirectTo: 'login' }
];
