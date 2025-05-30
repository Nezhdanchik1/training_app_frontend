import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface ExerciseEntry {
  exerciseId: string;  // ObjectId в виде строки
  sets: number;
  reps: number;
  rest: number; // в секундах
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
  createdAt?: string; // ISO дата в строковом формате
}

@Injectable({
  providedIn: 'root'
})

export class WorkoutPlanService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllPlans(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getNextWorkout(): Observable<WorkoutPlan> {
    return this.http.get<WorkoutPlan>(`${this.apiUrl}/next`);
  }

  getPlanById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createPlan(plan: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, plan);
  }

  deletePlan(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updatePlan(id: string, plan: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, plan);
  }
}
