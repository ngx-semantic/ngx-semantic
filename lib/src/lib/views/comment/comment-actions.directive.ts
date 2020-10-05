/**
 * Created by bolor on 7/16/2020
 */

import {Directive, HostBinding} from '@angular/core';

@Directive({
  selector: '[suiCommentActions]'
})
export class SuiCommentActionsDirective {
  @HostBinding('class')
  get classes(): string {
    return ['actions'].joinWithWhitespaceCleanup();
  }
}
