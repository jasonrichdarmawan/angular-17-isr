import { Component, TransferState, makeStateKey } from '@angular/core';

const DATE_BODY_COMPONENT_DATE = makeStateKey<string>("DATE_BODY_COMPONENT_DATE");

@Component({
  selector: 'poc-date-body',
  standalone: true,
  imports: [],
  templateUrl: './date-body.component.html',
  styleUrl: './date-body.component.scss'
})
export class DateBodyComponent {
  date: Date | null;

  constructor(
    transferState: TransferState,
  ) {
    this.date = this.initDate(transferState);
  }

  initDate(transferState: TransferState): Date | null {
    if (transferState.hasKey(DATE_BODY_COMPONENT_DATE)) {
      const result = transferState.get(DATE_BODY_COMPONENT_DATE, null);
      if (!result) { return null; }
      return new Date(result);
    }
    const result = new Date();
    transferState.set(DATE_BODY_COMPONENT_DATE, result.toISOString());
    return result;
  }
}
