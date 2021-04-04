/**
 * Created by bolor on 4/26/2020
 */

import {Directive, HostBinding, Input} from '@angular/core';
import {SuiSize} from 'ngx-semantic/core/enums';

@Directive({
  selector: '[sui-images]',
  exportAs: 'suiImages'
})
export class SuiImagesDirective {
  @Input() public suiSize: SuiSize = null;

  @HostBinding('class')
  get classes(): string {
    return [
      'ui',
      this.suiSize,
      'images'
    ].joinWithWhitespaceCleanup();
  }
}
