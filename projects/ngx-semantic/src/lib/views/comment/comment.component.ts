/**
 * Created by bolor on 7/20/2020
 */

import {Component, HostBinding} from '@angular/core';

@Component({
  selector: '[sui-comment]',
  template: `
    <ng-content></ng-content>
  `
})
export class SuiCommentComponent {
  @HostBinding('class')
  get classes(): string {
    return [
      'comment'
    ].joinWithWhitespaceCleanup();
  }
}
