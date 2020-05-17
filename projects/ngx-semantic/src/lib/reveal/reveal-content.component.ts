/**
 * Created by bolor on 5/17/2020
 */

import {Component, Input} from '@angular/core';

@Component({
  selector: '[sui-reveal-content]',
  template: `
    <ng-content></ng-content>
  `,
  host: {
    '[class.visible]': `suiVisible`,
    '[class.hidden]': `!suiVisible`,
    '[class.content]': `true`,
  }
})
export class SuiRevealContentComponent {
  @Input() suiVisible = false;
}
