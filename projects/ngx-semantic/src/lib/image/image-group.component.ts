/**
 * Created by bolor on 4/26/2020
 */

import {Component, Input} from '@angular/core';
import {SuiSize} from '../common';

@Component({
  selector: '[sui-image-group]',
  template: `
    <ng-content></ng-content>
  `,
  host: {
    '[class.ui]': `true`,
    '[class.image]': `true`,

    // sizes
    '[class.mini]': `suiSize == 'mini'`,
    '[class.tiny]': `suiSize == 'tiny'`,
    '[class.small]': `suiSize == 'small'`,
    '[class.medium]': `suiSize == 'medium'`,
    '[class.large]': `suiSize == 'large'`,
    '[class.big]': `suiSize == 'big'`,
    '[class.huge]': `suiSize == 'huge'`,
    '[class.massive]': `suiSize == 'massive'`,
  }
})
export class SuiImageGroupComponent {
  @Input() suiSize: SuiSize = null;
}
