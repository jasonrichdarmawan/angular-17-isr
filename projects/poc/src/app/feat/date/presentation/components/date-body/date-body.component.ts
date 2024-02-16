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
  date: string | null;

  constructor(
    transferState: TransferState,
  ) {
    this.date = this.initDate(transferState);
  }

  initDate(transferState: TransferState): string | null {
    console.log("initData");
    if (transferState.hasKey(DATE_BODY_COMPONENT_DATE)) {
      console.log("initData hasKey")
      const result = transferState.get(DATE_BODY_COMPONENT_DATE, null);
      if (!result) { return null; }
      return new Date(result).toUTCString();
    }
    console.log("initDataSet");
    const result = new Date().toUTCString();
    transferState.set(DATE_BODY_COMPONENT_DATE, result);
    return result;
  }
}
