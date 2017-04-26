import { Component, Input } from '@angular/core';

import { Child } from './child';

@Component({
  moduleId: module.id,
  selector: 'child-row',
  templateUrl: 'child-row.component.html',
  // styleUrls: [] // TODO
})
export class ChildRowComponent {
   @Input() child: Child;
   formatDOB (d: Date): string {
      const DATE_SEP = '-';

      const date = d.getDate();
      const month = d.getMonth();
      const year = d.getFullYear();

      return "" + month + DATE_SEP + date + DATE_SEP + year;
   }
}
