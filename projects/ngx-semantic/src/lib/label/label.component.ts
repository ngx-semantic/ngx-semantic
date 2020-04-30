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
  @Input() suiSize: SuiSize = null;
  @Input() suiImage = false;
  @Input() suiBasic = false;
  @Input() suiTag = false;
  @Input() suiTransparent = false;
  @Input() suiInverted = false;
  @Input() suiFluid = false;

  // states
  @Input() suiLoading = false;
  @Input() suiDisabled = false;
  @Input() suiError = false;

  @HostBinding('class')
  get classes(): string {
    return [
      'ui',
      this.getPointing(),
      this.getColour(),
      this.getCorner(),
      this.getImage(),
      this.getBasic(),
      this.getTag(),
      this.getRibbon(),
      'label']
      .join((' '));
  }

  getImage(): string {
    if (!this.suiImage) {
      return '';
    }

    return 'image';
  }

  getColour(): string {
    if (!this.suiColour) {
      return '';
    }

    return this.suiColour;
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
}
