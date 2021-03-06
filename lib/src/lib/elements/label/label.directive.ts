/**
 * Created by bolor on 4/30/2020
 */

import {Directive, HostBinding, Input} from '@angular/core';
import {SuiColour, SuiHorizontalAlignment, SuiLocation, SuiSize, Utils} from '../../common';
import {InputBoolean} from '../../core/util';

export type SuiLabelPointing = 'above' | 'below' | 'left' | 'right' | null;

@Directive({
  selector: '[sui-label]',
  exportAs: 'suiLabel'
})
export class SuiLabelDirective {
  @Input() public suiColour: SuiColour = null;
  @Input() public suiPointing: SuiLabelPointing = null;
  @Input() public suiCorner: SuiHorizontalAlignment = null;
  @Input() public suiRibbon: SuiHorizontalAlignment = null;
  @Input() public suiAttached: SuiLocation = null;
  @Input() public suiSize: SuiSize = null;
  @Input() @InputBoolean() public suiImage = false;
  @Input() @InputBoolean() public suiBasic = false;
  @Input() @InputBoolean() public suiTag = false;
  @Input() @InputBoolean() public suiHorizontal = false;
  @Input() @InputBoolean() public suiFloating = false;
  @Input() @InputBoolean() public suiCircular = false;
  @Input() @InputBoolean() public suiEmpty = false;

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
      'label'
    ].join((' '));
  }

  public getPointing(): string {
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

  public getCorner(): string {
    if (this.suiCorner === 'left' || this.suiCorner === 'right') {
      return this.suiCorner + ' corner';
    }

    return '';
  }

  public getRibbon(): string {
    const classKey = 'ribbon';

    if (this.suiRibbon === 'left') {
      return classKey;
    }

    if (this.suiRibbon === 'right') {
      return this.suiRibbon + ' ' + classKey;
    }

    return '';
  }

  public getAttached(): string {
    const classKey = 'attached';

    if (!this.suiAttached) {
      return '';
    }

    return this.suiAttached + ' ' + classKey;
  }

  public getFloating(): string {
    if (!this.suiFloating) {
      return '';
    }

    return 'floating';
  }
}
