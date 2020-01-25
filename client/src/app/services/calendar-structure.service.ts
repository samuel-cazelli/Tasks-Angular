import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalendarStructureService {

  constructor() { }

  getCalendar(year, month) {

    if (!year || !month){
      return null;
    }

    let aux = "".concat(year, "-", (month < 10 ? "0" : ""), month, '-01T00:00:00');

    let firstDayOfMonth = new Date(aux);

    const weekDayMonthBegin = firstDayOfMonth.getDay();

    let calendar = { header: [], weeks: [] };

    calendar.header = this.getRowWeekDaysNames(firstDayOfMonth, weekDayMonthBegin);

    calendar.weeks = [];

    //add a number of empty cells before the month starts
    calendar.weeks[0] = new Array(weekDayMonthBegin).fill(undefined);

    const daysInMonth = new Date(firstDayOfMonth.getFullYear(), firstDayOfMonth.getMonth() + 1, 0).getDate();
    for (let index = 0; index < daysInMonth; index++) {

      let currentDate = this.addDaysToDate(firstDayOfMonth, index);

      calendar.weeks[calendar.weeks.length - 1].push(currentDate);

      //if has filled the whole week needs to add to a new row
      if (calendar.weeks[calendar.weeks.length - 1].length === 7) {
        calendar.weeks.push([]);
      }
    }

    return calendar;
  }

  //Add number of days to a date
  addDaysToDate(date, daysToAdd) {
    return new Date(new Date(date.getTime()).setTime(date.getTime() + daysToAdd * 86400000));
  }

  //Create row filled with week days names to be used as a header on calendar
  getRowWeekDaysNames(firstDayOfMonth, weekDayMonthBegin) {
    let weekDaysNames = [];
    for (let index = 0; index < 7; index++) {
      const weekDayName = this.addDaysToDate(firstDayOfMonth, index - weekDayMonthBegin).toLocaleString(window.navigator.language, { weekday: 'short' });
      weekDaysNames.push(weekDayName);
    }
    return weekDaysNames
  }

}
