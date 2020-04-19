import {Component, Input} from '@angular/core';

export type SuiButtonType = 'primary' | 'secondary' | 'animated' | 'labeled' | 'basic' | null;
export type SuiButtonSize = 'mini' | 'tiny' | 'small' | 'medium' | 'large' | 'big' | 'huge' | 'massive' | null;

@Component({
  selector: 'button[sui-button], a[sui-button]',
  template: `
    <ng-content></ng-content>
  `,
  host: {
    '[class.ui]': `true`,
    '[class.button]': `true`,
    '[class.basic]': `suiType == 'basic'`,
    '[class.primary]': `suiType == 'primary'`,
    '[class.secondary]': `suiType == 'secondary'`,
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
export class SuiButtonComponent {
  @Input() suiType: SuiButtonType = null;
  @Input() suiSize: SuiButtonSize = null;

  constructor() {
  }
}
