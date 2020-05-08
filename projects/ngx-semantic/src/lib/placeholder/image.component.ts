/**
 * Created by bolor on 5/8/2020
 */

import {Component, Input} from '@angular/core';

@Component({
  selector: '[sui-placeholder-image]',
  template: `
    <ng-content></ng-content>
  `,
  host: {
    '[class.square]': `suiSquare`,
    '[class.rectangular]': `suiRectangular`,
    '[class.image]': `true`,
    '[class.header]': `suiHeader`,
  }
})
export class SuiPlaceholderImageComponent {
  @Input() suiSquare = false;
  @Input() suiRectangular = false;
  @Input() suiHeader = false;
}
