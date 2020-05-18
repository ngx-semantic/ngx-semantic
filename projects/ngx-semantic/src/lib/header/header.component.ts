import {Component, Input} from '@angular/core';
import {SuiColour, SuiLocation, SuiSize} from '../common';

export type SuiHeaderAlignment = 'left' | 'right' | 'center' | 'justified' | null;

@Component({
  selector: '[sui-header]',
  template: `
    <ng-content></ng-content>
  `,
  host: {
    '[class.ui]': `true`,
    '[class.icon]': `suiIcon`,
    '[class.sub]': `suiSubHeader`,
    '[class.dividing]': `suiDividing`,
    '[class.block]': `suiBlock`,
    '[class.attached]': `suiAttached`,
    '[class.floated]': `suiFloated`,
    '[class.inverted]': `suiInverted`,

    // states
    '[class.disabled]': `suiDisabled`,

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
    '[class.top]': `suiLocation == 'top'`,
    '[class.bottom]': `suiLocation == 'bottom'`,

    // alignments
    '[class.aligned]': `!!suiAlignment && suiAlignment !== 'justified'`,
    '[class.left]': `suiAlignment === 'left'`,
    '[class.right]': `suiAlignment === 'right'`,
    '[class.center]': `suiAlignment === 'center'`,
    '[class.justified]': `suiAlignment === 'justified'`,

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

    // close this out
    '[class.header]': `true`
  }
})
export class SuiHeaderComponent {
  @Input() suiSize: SuiSize = null;
  @Input() suiLocation: SuiLocation = null;
  @Input() suiAlignment: SuiHeaderAlignment = null;
  @Input() suiColour: SuiColour = null;
  @Input() suiIcon = false;
  @Input() suiSubHeader = false;
  @Input() suiDisabled = false;
  @Input() suiDividing = false;
  @Input() suiBlock = false;
  @Input() suiAttached = false;
  @Input() suiFloated = false;
  @Input() suiInverted = false;

  constructor() {
  }
}
