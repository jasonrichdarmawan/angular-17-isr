import { Component } from '@angular/core';
import { DateBodyComponent } from '../../components/date-body/date-body.component';

@Component({
  selector: 'poc-date',
  standalone: true,
  imports: [
    DateBodyComponent,
  ],
  templateUrl: './date.page.html',
  styleUrl: './date.page.scss'
})
export class DatePage {

}
