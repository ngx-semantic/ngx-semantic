/**
 * Created by bolor on 4/20/2020
 */

import {Component, Input} from '@angular/core';
import {SuiColour, SuiDirection, SuiLocation} from '../common/enums';

@Component({
  selector: '[sui-button-group]',
  template: `
    <ng-content></ng-content>
  `,
  host: {
    '[class.ui]': `true`,
    '[class.buttons]': `true`,
    '[class.icon]': `suiIcon`,
    '[class.labeled]': `suiLabeled`,
    '[class.basic]': `suiBasic`,
    '[class.attached]': `suiAttached`,

    // locations
    '[class.top]': `suiLocation === 'top'`,
    '[class.bottom]': `suiLocation === 'bottom'`,

    // directions
    '[class.vertical]': `suiDirection === 'vertical'`,

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
  }
})
export class SuiButtonGroupComponent {
  @Input() suiLocation: SuiLocation = null;
  @Input() suiDirection: SuiDirection = null;
  @Input() suiColour: SuiColour = null;
  @Input() suiIcon = false;
  @Input() suiAttached = false;
  @Input() suiLabeled = false;
  @Input() suiBasic = false;
}
