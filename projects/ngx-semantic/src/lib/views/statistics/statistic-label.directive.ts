/**
 * Created by bolor on 7/16/2020
 */

import {Directive, HostBinding} from '@angular/core';

@Directive({
  selector: '[suiStatLabel]'
})
export class SuiStatisticLabelDirective {
  @HostBinding('class')
  get classes(): string {
    return ['label'].joinWithWhitespaceCleanup();
  }
}
