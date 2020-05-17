/**
 * Created by bolor on 5/17/2020
 */

import {Component, Input} from '@angular/core';
import {SuiSize} from '../common';

export type SuiMoveDirection = 'left' | 'right' | 'up' | 'down' | null;
export type SuiRotateDirection = 'left' | 'right' | null;

@Component({
  selector: '[sui-reveal]',
  template: `
    <ng-content></ng-content>
  `,
  host: {
    '[class.ui]': `true`,

    // sizes
    '[class.mini]': `suiSize == 'mini'`,
    '[class.tiny]': `suiSize == 'tiny'`,
    '[class.small]': `suiSize == 'small'`,
    '[class.medium]': `suiSize == 'medium'`,
    '[class.large]': `suiSize == 'large'`,
    '[class.big]': `suiSize == 'big'`,
    '[class.huge]': `suiSize == 'huge'`,
    '[class.massive]': `suiSize == 'massive'`,

    // different states
    '[class.active]': `suiActive`,
    '[class.disabled]': `suiDisabled`,
    '[class.circular]': `suiCircular`,
    '[class.instant]': `suiInstant`,
    '[class.fade]': `suiFade`,

    // rotate support
    '[class.rotate]': `!!suiRotate`,
    '[class.left]': `suiRotate === 'left'`,

    // move support
    '[class.move]': `!!suiMove`,
    '[class.right]': `suiMove === 'right'`,
    '[class.up]': `suiMove === 'up'`,
    '[class.down]': `suiMove === 'down'`,

    '[class.reveal]': `true`,
    '[class.image]': `suiImage`
  }
})
export class SuiRevealComponent {
  @Input() suiMove: SuiMoveDirection = null;
  @Input() suiRotate: SuiRotateDirection = null;
  @Input() suiSize: SuiSize = null;
  @Input() suiFade = false;
  @Input() suiActive = false;
  @Input() suiInstant = false;
  @Input() suiDisabled = false;
  @Input() suiCircular = false;
  @Input() suiImage = false;
}
