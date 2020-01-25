import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export class Task {
  _id: string;
  name: string;
  date: Date;
  completed: boolean;
}


@Injectable({
  providedIn: 'root'
})
export class TasksService {

  uri = 'http://localhost:4000/api';

  constructor(
    private http: HttpClient
  ) {

  }

  getTasksByDay(date: Date) {
    return this.http.get(`${this.uri}/get-tasks-by-day?date=${date}`);
  }

  add(task: Task) {
    return this.http.post(`${this.uri}/add-task/`, task);
  }

  toggleCompleted(id: string) {
    return this.http.get(`${this.uri}/toggle-complete?id=${id}`);
  }

}
