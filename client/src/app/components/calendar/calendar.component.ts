import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { CalendarStructureService } from 'src/app/services/calendar-structure.service';
import { Task, TasksService } from 'src/app/services/tasks.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  calendarStructureData = {};

  @Input()
  currentMonth: number;
  
  @Input()
  currentYear: number;

  @Input()
  selectedDate: Date = null;

  @Output() 
  onChangeSelectedDate = new EventEmitter();

  @Output()
  onMoveCalendar = new EventEmitter();

  constructor(
    private calendarStructure: CalendarStructureService,
    private taskService: TasksService,
    private route: ActivatedRoute,
    private router: Router,
  ) {

  }

  ngOnInit() {

    this.calendarStructureData = this.calendarStructure.getCalendar(this.currentYear, this.currentMonth);
   
  }

  handleMoveCalendarBack() {

    this.currentYear = (this.currentMonth === 1) ? this.currentYear - 1 : this.currentYear;
    this.currentMonth = (this.currentMonth === 1) ? 12 : this.currentMonth - 1;

    this.calendarStructureData = this.calendarStructure.getCalendar(this.currentYear, this.currentMonth);

    this.onMoveCalendar.emit({ year: this.currentYear, month: this.currentMonth});
  }

  handleMoveCalendarForward() {

    this.currentYear = (this.currentMonth === 12) ? this.currentYear + 1 : this.currentYear;
    this.currentMonth = (this.currentMonth === 12) ? 1 : this.currentMonth + 1;

    this.calendarStructureData = this.calendarStructure.getCalendar(this.currentYear, this.currentMonth);

    this.onMoveCalendar.emit({ year: this.currentYear, month: this.currentMonth});
  }

  handleChangeSelectedDate(date: Date) {
    if (date) {
      this.selectedDate = date;
      this.onChangeSelectedDate.emit(date);
    }
  }

}
