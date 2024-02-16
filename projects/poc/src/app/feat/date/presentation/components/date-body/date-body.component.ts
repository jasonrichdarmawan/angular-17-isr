import { Component } from '@angular/core';

@Component({
  selector: 'poc-date-body',
  standalone: true,
  imports: [],
  templateUrl: './date-body.component.html',
  styleUrl: './date-body.component.scss'
})
export class DateBodyComponent {
  date: Date;

  constructor() {
    this.date = new Date();
  }
}
