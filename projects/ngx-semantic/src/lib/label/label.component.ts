/**
 * Created by bolor on 4/30/2020
 */

import {Component, Input} from '@angular/core';
import {SuiLocation, SuiSize} from '../common';

@Component({
  selector: '[sui-label]',
  template: `
    <ng-content></ng-content>
  `,
  host: {
    '[class.ui]': `true`,
    '[class.input]': `true`,
    '[class.focus]': `suiFocus`,
    '[class.icon]': `suiIcon`,
    '[class.labeled]': `suiLabeled`,
    '[class.corner]': `suiCorner`,
    '[class.action]': `suiAction`,
    '[class.transparent]': `suiTransparent`,
    '[class.inverted]': `suiInverted`,
    '[class.fluid]': `suiFluid`,

    // states
    '[class.loading]': `suiLoading`,
    '[class.disabled]': `suiDisabled`,
    '[class.error]': `suiError`,

    // location
    '[class.left]': `suiLocation === 'left'`,
    '[class.right]': `suiLocation === 'right'`,

    // sizes
    '[class.mini]': `suiSize == 'mini'`,
    '[class.tiny]': `suiSize == 'tiny'`,
    '[class.small]': `suiSize == 'small'`,
    '[class.medium]': `suiSize == 'medium'`,
    '[class.large]': `suiSize == 'large'`,
    '[class.big]': `suiSize == 'big'`,
    '[class.huge]': `suiSize == 'huge'`,
    '[class.massive]': `suiSize == 'massive'`
  }
})
export class SuiLabelComponent {
  @Input() suiLocation: SuiLocation = null;
  @Input() suiSize: SuiSize = null;
  @Input() suiFocus = false;
  @Input() suiIcon = false;
  @Input() suiLabeled = false;
  @Input() suiCorner = false;
  @Input() suiAction = false;
  @Input() suiTransparent = false;
  @Input() suiInverted = false;
  @Input() suiFluid = false;

  // states
  @Input() suiLoading = false;
  @Input() suiDisabled = false;
  @Input() suiError = false;
}
