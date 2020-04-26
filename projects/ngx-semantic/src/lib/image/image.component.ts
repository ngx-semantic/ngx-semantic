/**
 * Created by bolor on 4/26/2020
 */

import {Component, Input} from '@angular/core';
import {SuiLocation, SuiSize} from '../common';

export type SuiImageAlignment = 'top' | 'bottom' | 'middle' | null;
export type SuiImageSpacing = 'left' | 'right' | 'both' | null;
export type SuiImageFloat = 'left' | 'right' | null;

@Component({
  selector: '[sui-image]',
  template: `
    <ng-content></ng-content>
  `,
  host: {
    '[class.ui]': `true`,
    '[class.image]': `true`,
    '[class.spaced]': `suiSpaced`,
    '[class.floated]': `suiFloated`,

    // states
    '[class.disabled]': `suiDisabled`,
    '[class.hidden]': `suiHidden`,

    // finishes
    '[class.circular]': `suiCircular`,
    '[class.rounded]': `suiRounded`,
    '[class.fluid]': `suiFluid`,
    '[class.avatar]': `suiAvatar`,

    // sizes
    '[class.mini]': `suiSize == 'mini'`,
    '[class.tiny]': `suiSize == 'tiny'`,
    '[class.small]': `suiSize == 'small'`,
    '[class.medium]': `suiSize == 'medium'`,
    '[class.large]': `suiSize == 'large'`,
    '[class.big]': `suiSize == 'big'`,
    '[class.huge]': `suiSize == 'huge'`,
    '[class.massive]': `suiSize == 'massive'`,

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
}
