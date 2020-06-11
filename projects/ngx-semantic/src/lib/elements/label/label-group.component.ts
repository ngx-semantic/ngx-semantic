/**
 * Created by bolor on 4/26/2020
 */

import {Component, HostBinding, Input} from '@angular/core';
import {SuiColour, SuiSize} from '../../common';

@Component({
  selector: '[sui-label-group]',
  template: `
    <ng-content></ng-content>
  `
})
export class SuiLabelGroupComponent {
  @Input() suiSize: SuiSize = null;
  @Input() suiColour: SuiColour = null;
  @Input() suiTag = false;
  @Input() suiCircular = false;

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

  getTag(): string {
    if (!this.suiTag) {
      return '';
    }

    return 'tag';
  }

  getCircular(): string {
    if (!this.suiCircular) {
      return '';
    }

    return 'circular';
  }
}
