/**
 * Created by bolor on 4/26/2020
 */

import {Component, HostBinding, Input} from '@angular/core';
import {SuiLocation, SuiSize, Utils} from '../common';

export type SuiImageAlignment = 'top' | 'bottom' | 'middle' | null;

@Component({
  selector: '[sui-image]',
  template: `
    <ng-content></ng-content>
  `,
  host: {
    '[class.spaced]': `suiSpaced`,
    '[class.floated]': `suiFloated`,

    // finishes
    '[class.circular]': `suiCircular`,
    '[class.rounded]': `suiRounded`,
    '[class.fluid]': `suiFluid`,
    '[class.avatar]': `suiAvatar`,

    // alignments
    '[class.aligned]': `!!suiAlignment`,
    '[class.top]': `suiAlignment === 'top'`,
    '[class.bottom]': `suiAlignment === 'bottom'`,
    '[class.middle]': `suiAlignment === 'middle'`,
    '[class.centered]': `suiCentered`,

    // locations
    '[class.left]': `suiLocation == 'left'`,
    '[class.right]': `suiLocation == 'right'`,
  }
})
export class SuiImageComponent {
  @Input() suiSize: SuiSize = null;
  @Input() suiAlignment: SuiImageAlignment = null;
  @Input() suiLocation: SuiLocation = null;
  @Input() suiHidden = false;
  @Input() suiDisabled = false;
  @Input() suiAvatar = false;
  @Input() suiBordered = false;
  @Input() suiFluid = false;
  @Input() suiRounded = false;
  @Input() suiCircular = false;
  @Input() suiCentered = false;
  @Input() suiSpaced = false;
  @Input() suiFloated = false;

  @HostBinding('class')
  get classes(): string {
    return [
      'ui',
      this.suiSize,
      Utils.getPropClass(this.suiHidden, 'hidden'),
      Utils.getPropClass(this.suiDisabled, 'disabled'),
      'image'
    ].joinWithWhitespaceCleanup();
  }
}
