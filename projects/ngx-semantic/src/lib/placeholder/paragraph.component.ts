/**
 * Created by bolor on 5/8/2020
 */

import {Component, HostBinding} from '@angular/core';

@Component({
  selector: '[sui-placeholder-paragraph]',
  template: `
    <ng-content></ng-content>
  `
})
export class SuiPlaceholderParagraphComponent {
  @HostBinding('class')
  get classes(): string {
    return 'paragraph';
  }
}
