/**
 * Created by bolor on 4/30/2020
 */

import {Component, HostBinding, Input} from '@angular/core';
import {SuiColour, SuiHorizontalAlignment, SuiLocation, SuiSize, Utils} from '../common';

export type SuiLabelPointing = 'above' | 'below' | 'left' | 'right' | null;

@Component({
  selector: '[sui-label]',
  template: `
    <ng-content></ng-content>
  `
})
export class SuiLabelComponent {
  @Input() suiColour: SuiColour = null;
  @Input() suiPointing: SuiLabelPointing = null;
  @Input() suiCorner: SuiHorizontalAlignment = null;
  @Input() suiRibbon: SuiHorizontalAlignment = null;
  @Input() suiAttached: SuiLocation = null;
  @Input() suiSize: SuiSize = null;
  @Input() suiImage = false;
  @Input() suiBasic = false;
  @Input() suiTag = false;
  @Input() suiHorizontal = false;
  @Input() suiFloating = false;
  @Input() suiCircular = false;
  @Input() suiEmpty = false;

  @HostBinding('class')
  get classes(): string {
    return [
      this.getFloating(),
      'ui',
      this.getPointing(),
      this.suiColour,
      this.suiSize,
      this.getCorner(),
      Utils.getPropClass(this.suiImage, 'image'),
      Utils.getPropClass(this.suiBasic, 'basic'),
      Utils.getPropClass(this.suiTag, 'tag'),
      this.getRibbon(),
      this.getAttached(),
      Utils.getPropClass(this.suiHorizontal, 'horizontal'),
      Utils.getPropClass(this.suiEmpty, 'empty'),
      Utils.getPropClass(this.suiCircular, 'circular'),
      'label'].join((' '));
  }

  getPointing(): string {
    const classKey = 'pointing';

    if (!this.suiPointing) {
      return '';
    }

    if (this.suiPointing === 'above') {
      return classKey;
    }

    if (this.suiPointing === 'below') {
      return classKey + ' ' + this.suiPointing;
    }

    return this.suiPointing + ' ' + classKey;
  }

  getCorner(): string {
    if (this.suiCorner === 'left' || this.suiCorner === 'right') {
      return this.suiCorner + ' corner';
    }

    return '';
  }

  getRibbon(): string {
    const classKey = 'ribbon';

    if (this.suiRibbon === 'left') {
      return classKey;
    }

    if (this.suiRibbon === 'right') {
      return this.suiRibbon + ' ' + classKey;
    }

    return '';
  }

  getAttached(): string {
    const classKey = 'attached';

    if (!this.suiPointing) {
      return '';
    }

    return this.suiAttached + ' ' + classKey;
  }

  getFloating(): string {
    if (!this.suiFloating) {
      return '';
    }

    return 'floating';
  }
}
