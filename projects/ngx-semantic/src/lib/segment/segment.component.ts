/**
 * Created by bolor on 5/18/2020
 */

import {Component, HostBinding, Input} from '@angular/core';
import {SuiColour, Utils} from '../common';

@Component({
  selector: '[sui-segment]',
  template: `
  <ng-content></ng-content>
  `
})
export class SuiSegmentComponent {
  @Input() suiColour: SuiColour = null;
  @Input() suiPlaceholder = false;
  @Input() suiRaised = false;
  @Input() suiStacked = false;
  @Input() suiPiled = false;
  @Input() suiVertical = false;
  @Input() suiSecondary = false;

  @HostBinding('class')
  get classes(): string {
    return [
      'ui',
      Utils.getPropClass(this.suiPlaceholder, 'placeholder'),
      Utils.getPropClass(this.suiRaised, 'raised'),
      Utils.getPropClass(this.suiStacked, 'stacked'),
      Utils.getPropClass(this.suiPiled, 'piled'),
      Utils.getPropClass(this.suiSecondary, 'secondary'),
      Utils.getPropClass(this.suiVertical, 'vertical'),
      'segment'
    ].join(' ');
  }
}
