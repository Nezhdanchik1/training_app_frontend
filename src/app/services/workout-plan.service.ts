import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface ExerciseEntry {
  exerciseId: string;
  sets: number;
  reps: number;
  rest: number;
}

export type WeekDay = 
  | 'Понедельник'
  | 'Вторник'
  | 'Среда'
  | 'Четверг'
  | 'Пятница'
  | 'Суббота'
  | 'Воскресенье';

export interface WorkoutDay {
  day: WeekDay;
  exercises: ExerciseEntry[];
}

export interface WorkoutPlan {
  _id?: string;
  name: string;
  description?: string;
  days: WorkoutDay[];
  userId?: string;
  createdAt?: string;
}

@Injectable({
  providedIn: 'root'
})

export class WorkoutPlanService {
  private apiUrl = `${environment.apiUrl}/api/plans`;

  constructor(private http: HttpClient) {}

  getAllPlans(): Observable<WorkoutPlan[]> {
    return this.http.get<WorkoutPlan[]>(this.apiUrl);
  }

  getPlanById(id: string): Observable<WorkoutPlan> {
    return this.http.get<WorkoutPlan>(`${this.apiUrl}/${id}`);
  }

  getPlansByUser(userId: string): Observable<WorkoutPlan[]> {
    return this.http.get<WorkoutPlan[]>(`${this.apiUrl}?userId=${userId}`);
  }

  getPublicPlans(): Observable<WorkoutPlan[]> {
    return this.http.get<WorkoutPlan[]>(`${this.apiUrl}/public`);
  }

  createPlan(plan: WorkoutPlan): Observable<WorkoutPlan> {
    return this.http.post<WorkoutPlan>(this.apiUrl, plan);
  }

  deletePlan(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updatePlan(id: string, plan: WorkoutPlan): Observable<WorkoutPlan> {
    return this.http.put<WorkoutPlan>(`${this.apiUrl}/${id}`, plan);
  }

}
