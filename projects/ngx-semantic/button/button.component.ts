import {Component, Input} from '@angular/core';

export type SuiButtonStyle = 'primary' | 'secondary' | 'positive' | 'negative' | null;
export type SuiButtonDirection = 'left' | 'right' | null;
export type SuiButtonSize = 'mini' | 'tiny' | 'small' | 'medium' | 'large' | 'big' | 'huge' | 'massive' | null;
export type SuiButtonColour = 'red' | 'orange' | 'yellow' | 'olive' | 'green' | 'teal' | 'blue' | 'pink' | 'brown' | 'grey'
  | 'black' | null;

@Component({
  selector: 'button[sui-button], a[sui-button]',
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
    '[class.primary]': `suiStyle == 'primary'`,
    '[class.secondary]': `suiStyle == 'secondary'`,
    '[class.positive]': `suiStyle == 'positive'`,
    '[class.negative]': `suiStyle == 'negative'`,
    '[class.mini]': `suiSize == 'mini'`,
    '[class.tiny]': `suiSize == 'tiny'`,
    '[class.small]': `suiSize == 'small'`,
    '[class.medium]': `suiSize == 'medium'`,
    '[class.large]': `suiSize == 'large'`,
    '[class.big]': `suiSize == 'big'`,
    '[class.huge]': `suiSize == 'huge'`,
    '[class.massive]': `suiSize == 'massive'`,
    '[class.right]': `suiDirection == 'right'`,
    '[class.left]': `suiDirection == 'left'`,
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
    '[class.black]': `suiColour == 'black'`
  }
})
export class SuiButtonComponent {
  @Input() suiStyle: SuiButtonStyle = null;
  @Input() suiSize: SuiButtonSize = null;
  @Input() suiDirection: SuiButtonDirection = null;
  @Input() suiColour: SuiButtonColour = null;
  @Input() suiIcon = false;
  @Input() suiBasic = false;
  @Input() suiInverted = false;
  @Input() suiAnimated = false;
  @Input() suiLabeled = false;

  constructor() {
  }
}
