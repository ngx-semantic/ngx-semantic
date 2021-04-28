/**
 * Created by bolor on 4/30/2020
 */

import {Directive, ElementRef, Input} from '@angular/core';
import {SuiColour, SuiHorizontalAlignment, SuiLocation, SuiSize, SuiWidth} from 'ngx-semantic/core/enums';
import {ClassUtils, InputBoolean} from 'ngx-semantic/core/util';
import {BaseDirective} from 'ngx-semantic/core/base';

export type SuiLabelPointing = 'above' | 'below' | 'left' | 'right' | null;

@Directive({
  selector: '[sui-label]',
  exportAs: 'suiLabel'
})
export class SuiLabelDirective extends BaseDirective {
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

  constructor(element: ElementRef) {
    super(element);
  }

  get classes(): string {
    return [
      this.getFloating(),
      'ui',
      this.getPointing(),
      this.suiColour,
      this.suiSize,
      this.getCorner(),
      ClassUtils.getPropClass(this.suiImage, 'image'),
      ClassUtils.getPropClass(this.suiBasic, 'basic'),
      ClassUtils.getPropClass(this.suiTag, 'tag'),
      this.getRibbon(),
      this.getAttached(),
      ClassUtils.getPropClass(this.suiHorizontal, 'horizontal'),
      ClassUtils.getPropClass(this.suiEmpty, 'empty'),
      ClassUtils.getPropClass(this.suiCircular, 'circular'),
      'label'
    ].join(' ');
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
