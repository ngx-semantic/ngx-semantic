/**
 * Created by bolor on 5/8/2020
 */

import {Component} from '@angular/core';

@Component({
  selector: '[sui-placeholder-paragraph]',
  template: `
    <ng-content></ng-content>
  `,
  host: {
    '[class.paragraph]': `true`
  }
})
export class SuiPlaceholderParagraphComponent {
}
