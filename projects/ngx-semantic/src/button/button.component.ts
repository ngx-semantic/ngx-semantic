import {Component, Input} from '@angular/core';
import {SuiColour, SuiLocation, SuiSize} from '../common';

export type SuiButtonStyle = 'primary' | 'secondary' | 'positive' | 'negative' | null;
export type SuiSocialButtonStyle = 'facebook' | 'twitter' | 'google' | 'vk' | 'linkedin' | 'instagram' | 'youtube' | null;

@Component({
  selector: 'button[sui-button], a[sui-button], div[sui-button]',
  template: `
    <ng-content></ng-content>
  `,
  host: {
    '[class.ui]': `true`,
    '[class.button]': `true`,
    '[class.basic]': `suiBasic`,
    '[class.labeled]': `suiLabeled`,
    '[class.inverted]': `suiInverted`,
    '[class.icon]': `suiIcon`,
    '[class.compact]': `suiCompact`,
    '[class.toggle]': `suiToggle`,
    '[class.fluid]': `suiFluid`,
    '[class.circular]': `suiCircular`,
    '[class.attached]': `suiAttached`,

    // states
    '[class.disabled]': `suiDisabled`,
    '[class.active]': `suiActive`,
    '[class.loading]': `suiLoading`,

    // styles
    '[class.primary]': `suiStyle == 'primary'`,
    '[class.secondary]': `suiStyle == 'secondary'`,
    '[class.positive]': `suiStyle == 'positive'`,
    '[class.negative]': `suiStyle == 'negative'`,

    // sizes
    '[class.mini]': `suiSize == 'mini'`,
    '[class.tiny]': `suiSize == 'tiny'`,
    '[class.small]': `suiSize == 'small'`,
    '[class.medium]': `suiSize == 'medium'`,
    '[class.large]': `suiSize == 'large'`,
    '[class.big]': `suiSize == 'big'`,
    '[class.huge]': `suiSize == 'huge'`,
    '[class.massive]': `suiSize == 'massive'`,

    // locations
    '[class.right]': `suiLocation == 'right'`,
    '[class.left]': `suiLocation == 'left'`,
    '[class.top]': `suiLocation == 'top'`,
    '[class.bottom]': `suiLocation == 'bottom'`,

    // colours
    '[class.red]': `suiColour == 'red'`,
    '[class.orange]': `suiColour == 'orange'`,
    '[class.yellow]': `suiColour == 'yellow'`,
    '[class.olive]': `suiColour == 'olive'`,
    '[class.green]': `suiColour == 'green'`,
    '[class.teal]': `suiColour == 'teal'`,
    '[class.blue]': `suiColour == 'blue'`,
    '[class.pink]': `suiColour == 'pink'`,
    '[class.brown]': `suiColour == 'brown'`,
    '[class.grey]': `suiColour == 'grey'`,
    '[class.black]': `suiColour == 'black'`,

    // social buttons
    '[class.facebook]': `suiSocial == 'facebook'`,
    '[class.twitter]': `suiSocial == 'twitter'`,
    '[class.google]': `suiSocial == 'google'`,
    '[class.vk]': `suiSocial == 'vk'`,
    '[class.linkedin]': `suiSocial == 'linkedin'`,
    '[class.instagram]': `suiSocial == 'instagram'`,
    '[class.youtube]': `suiSocial == 'youtube'`,
  }
})
export class SuiButtonComponent {
  @Input() suiStyle: SuiButtonStyle = null;
  @Input() suiSize: SuiSize = null;
  @Input() suiLocation: SuiLocation = null;
  @Input() suiColour: SuiColour = null;
  @Input() suiSocial: SuiSocialButtonStyle = null;
  @Input() suiIcon = false;
  @Input() suiBasic = false;
  @Input() suiInverted = false;
  @Input() suiAnimated = false;
  @Input() suiLabeled = false;
  @Input() suiCompact = false;
  @Input() suiToggle = false;
  @Input() suiFluid = false;
  @Input() suiCircular = false;
  @Input() suiAttached = false;
  @Input() suiActive = false;
  @Input() suiDisabled = false;
  @Input() suiLoading = false;

  constructor() {
  }
}