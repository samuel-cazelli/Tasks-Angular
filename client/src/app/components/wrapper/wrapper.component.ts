import { Component, OnInit, ViewChild } from '@angular/core';

import { Title } from '@angular/platform-browser';

import { ActivatedRoute, Router } from '@angular/router';
import { TasksComponent } from '../tasks/tasks.component';


@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.css']
})
export class WrapperComponent implements OnInit {

  selectedDate: Date = null;
  currentMonthCalendar: number;
  currentYearCalendar: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title
  ) { }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {

      let dateParts = params.date ? params.date.split("-") : [];

      //set current year with param or use default
      let paramYear = dateParts.length > 0 ? dateParts[0] : null;
      this.currentYearCalendar = paramYear ? Number.parseInt(paramYear) : new Date().getFullYear();

      //set current month with param or use default
      let paramMonth = dateParts.length > 1 ? dateParts[1] : null;
      this.currentMonthCalendar = paramMonth ? Number.parseInt(paramMonth) : new Date().getMonth() + 1;


      //if there's a day in param, sets it
      let currentDay = dateParts.length > 2 ? Number.parseInt(dateParts[2]) : null;

      let currentDate = this.selectedDate ? this.selectedDate : new Date();
      if (currentDay) {
        currentDate = new Date(params.date + ' 00:00:00');
      }

      currentDate.setHours(0, 0, 0, 0);
      this.selectedDate = currentDate;

      if (!params.date) {
        this.changeParamUrl();
      }



    });


  }

  changeParamUrl() {

    let paramDate = this.currentYearCalendar + '-' + this.currentMonthCalendar;

    let currentDay: number = null;

    if (this.currentYearCalendar === this.selectedDate.getFullYear() && this.currentMonthCalendar === this.selectedDate.getMonth() + 1) {
      currentDay = this.selectedDate.getDate();
    }

    if (currentDay && currentDay !== 0) {
      paramDate += '-' + currentDay;
    }

    this.router.navigate(['/'], { queryParams: { date: paramDate } });
    
    this.titleService.setTitle('Tasks - ' + paramDate);

  }

  handleChangeSelectedDate(date) {
    this.selectedDate = date;

    this.changeParamUrl();
  }

  handleMoveCalendar(param) {

    this.currentYearCalendar = param.year;
    this.currentMonthCalendar = param.month;

    this.changeParamUrl();
  }


}
