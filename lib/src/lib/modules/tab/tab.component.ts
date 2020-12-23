/**
 * Created by bolorundurowb on 12/22/2020
 */

import {Component, Input} from '@angular/core';

@Component({
  selector: 'sui-tab',
  template: `
    <ng-content></ng-content>
  `
})
export class SuiTabComponent {
  @Input() public suiTitle: string = null;
  @Input() public suiIcon: string = null;
}
