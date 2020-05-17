import {Component, Input} from '@angular/core';
import {SuiDirection} from '../common';

@Component({
  selector: '[sui-divider]',
  template: `
    <ng-content></ng-content>
  `,
  host: {
    '[class.ui]': `true`,

    // various states
    '[class.header]': `suiHeader`,
    '[class.inverted]': `suiInverted`,
    '[class.fitted]': `suiFitted`,
    '[class.hidden]': `suiHidden`,
    '[class.section]': `suiSection`,
    '[class.clearing]': `suiClearing`,

    // direction
    '[class.vertical]': `suiDirection === 'vertical'`,
    '[class.horizontal]': `suiDirection === 'horizontal'`,

    // close this out
    '[class.divider]': `true`,
  }
})
export class SuiDividerComponent {
  @Input() suiDirection: SuiDirection = null;
  @Input() suiHeader = false;
  @Input() suiInverted = false;
  @Input() suiFitted = false;
  @Input() suiHidden = false;
  @Input() suiSection = false;
  @Input() suiClearing = false;

  constructor() {
  }
}
