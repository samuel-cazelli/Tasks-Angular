import { Component, OnInit, Input, SimpleChange } from '@angular/core';


import { Task, TasksService } from 'src/app/services/tasks.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  @Input()
  selectedDate: Date = null;

  tasks: Task[];

  constructor(
    private taskService: TasksService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {

  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    this.fillTastksDay();
  }

  fillTastksDay() {

    this.taskService.getTasksByDay(this.selectedDate)
      .subscribe((data: Task[]) => {
        this.tasks = data;
      });

  }

  addTask(taskName: string) {
    this.taskService.add({
      _id: "",
      name: taskName,
      date: this.selectedDate,
      completed: false
    }).subscribe(() => this.fillTastksDay());
  }

  handleToggleTaskCompleted(task) {
    this.taskService.toggleCompleted(task._id)
      .subscribe(() => this.fillTastksDay());
  }

  handleClickAddTask(taskName: string) {
    this.addTask(taskName);
  }

  handleTypeEnterAddTask(taskName: string) {
    this.addTask(taskName);
  }

}
