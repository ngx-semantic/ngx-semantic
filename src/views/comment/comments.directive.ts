/**
 * Created by bolor on 7/20/2020
 */

import {Directive, HostBinding, Input} from '@angular/core';
import {ClassUtils, InputBoolean} from 'ngx-semantic/core/util';
import {SuiSize} from 'ngx-semantic/core/enums';

@Directive({
  selector: '[sui-comments]',
  exportAs: 'suiComments'
})
export class SuiCommentsDirective {
  @Input() public suiSize: SuiSize = null;
  @Input() @InputBoolean() public suiThreaded = false;
  @Input() @InputBoolean() public suiMinimal = false;
  @Input() @InputBoolean() public suiCollapsed = false;

  @HostBinding('class')
  get classes(): Array<string> {
    return [
      'ui',
      this.suiSize,
      ClassUtils.getPropClass(this.suiMinimal, 'minimal'),
      ClassUtils.getPropClass(this.suiThreaded, 'threaded'),
      ClassUtils.getPropClass(this.suiCollapsed, 'collapsed'),
      'comments'
    ];
  }
}
