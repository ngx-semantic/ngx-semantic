/**
 * Created by bolor on 4/26/2020
 */

import {Directive, HostBinding, Input} from '@angular/core';
import {SuiColour, SuiSize} from 'ngx-semantic/core/enums';
import {InputBoolean} from 'ngx-semantic/core/util';

@Directive({
  selector: '[sui-labels]',
  exportAs: 'suiLabels'
})
export class SuiLabelsDirective {
  @Input() public suiSize: SuiSize = null;
  @Input() public suiColour: SuiColour = null;
  @Input() @InputBoolean() public suiTag = false;
  @Input() @InputBoolean() public suiCircular = false;

  @HostBinding('class')
  get classes(): string {
    return [
      'ui',
      this.suiColour,
      this.suiSize,
      this.getTag(),
      this.getCircular(),
      'labels']
      .join((' '));
  }

  public getTag(): string {
    if (!this.suiTag) {
      return '';
    }

    return 'tag';
  }

  public getCircular(): string {
    if (!this.suiCircular) {
      return '';
    }

    return 'circular';
  }
}
