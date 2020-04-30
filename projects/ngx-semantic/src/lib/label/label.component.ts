/**
 * Created by bolor on 4/30/2020
 */

import {Component, HostBinding, Input} from '@angular/core';
import {SuiColour, SuiLocation, SuiSize} from '../common';

export type SuiLabelPointing = 'above' | 'below' | 'left' | 'right' | null;
export type SuiLabelHorizontalPosition = 'left' | 'right' | null;

@Component({
  selector: '[sui-label]',
  template: `
    <ng-content></ng-content>
  `
})
export class SuiLabelComponent {
  @Input() suiColour: SuiColour = null;
  @Input() suiPointing: SuiLabelPointing = null;
  @Input() suiCorner: SuiLabelHorizontalPosition = null;
  @Input() suiRibbon: SuiLabelHorizontalPosition = null;
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
      this.getImage(),
      this.getBasic(),
      this.getTag(),
      this.getRibbon(),
      this.getAttached(),
      this.getHorizontal(),
      this.getEmpty(),
      this.getCircular(),
      'label']
      .join((' '));
  }

  getImage(): string {
    if (!this.suiImage) {
      return '';
    }

    return 'image';
  }

  getBasic(): string {
    if (!this.suiBasic) {
      return '';
    }

    return 'basic';
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

  getTag(): string {
    if (!this.suiTag) {
      return '';
    }

    return 'tag';
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

  getHorizontal(): string {
    if (!this.suiHorizontal) {
      return '';
    }

    return 'horizontal';
  }

  getFloating(): string {
    if (!this.suiFloating) {
      return '';
    }

    return 'floating';
  }

  getCircular(): string {
    if (!this.suiCircular) {
      return '';
    }

    return 'circular';
  }

  getEmpty(): string {
    if (!this.suiEmpty) {
      return '';
    }

    return 'empty';
  }
}
