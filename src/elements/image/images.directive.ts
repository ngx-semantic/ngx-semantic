/**
 * Created by bolor on 4/26/2020
 */

import { Directive, Input } from '@angular/core';
import { SuiSize } from 'ngx-semantic/core/enums';
import { BaseDirective } from 'ngx-semantic/core/base';

@Directive({
  standalone: true,
  selector: '[sui-images]',
  exportAs: 'suiImages'
})
export class SuiImagesDirective extends BaseDirective {
  @Input() public suiSize: SuiSize = null;

  get classes(): string {
    return [
      'ui',
      this.suiSize,
      'images'
    ].join(' ');
  }
}
