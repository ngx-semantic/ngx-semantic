import {Directive, ElementRef, HostBinding, Input} from '@angular/core';
import {SuiColour, SuiSize} from 'ngx-semantic/core/enums';
import {ClassUtils, InputBoolean} from 'ngx-semantic/core/util';
import {BaseDirective} from 'ngx-semantic/core/base';

export type SuiIconFlipDirection = 'horizontal' | 'vertical' | null;
export type SuiIconRotationDirection = 'clockwise' | 'counterclockwise' | null;
export type SuiIconCornerPosition = 'top left' | 'top right' | 'bottom left' | 'bottom right' | null;

@Directive({
  selector: 'i[sui-icon]',
  exportAs: 'suiIcon'
})
export class SuiIconDirective extends BaseDirective {
  @Input() public suiSize: SuiSize = null;
  @Input() public suiFlip: SuiIconFlipDirection = null;
  @Input() public suiRotation: SuiIconRotationDirection = null;
  @Input() public suiColour: SuiColour = null;
  @Input() public suiCorner: SuiIconCornerPosition = null;
  @Input() public suiIconType: string = null;
  @Input() @InputBoolean() public disabled = false;
  @Input() @InputBoolean() public suiLoading = false;
  @Input() @InputBoolean() public suiFitted = false;
  @Input() @InputBoolean() public suiLink = false;
  @Input() @InputBoolean() public suiCircular = false;
  @Input() @InputBoolean() public suiBordered = false;
  @Input() @InputBoolean() public suiInverted = false;
  @Input() @InputBoolean() public suiOutline = false;

  constructor(element: ElementRef) {
    super(element);
  }

  get classes(): string {
    return [
      ClassUtils.getPropClass(this.suiFitted, 'fitted'),
      ClassUtils.getPropClass(this.disabled, 'disabled'),
      this.suiSize,
      this.suiFlip ? `${this.suiFlip}ly flipped` : '',
      this.suiRotation ? `${this.suiRotation} rotated` : '',
      ClassUtils.getPropClass(this.suiCircular, 'circular'),
      ClassUtils.getPropClass(this.suiBordered, 'bordered'),
      ClassUtils.getPropClass(this.suiInverted, 'inverted'),
      this.suiCorner ? `${this.suiCorner} corner` : '',
      this.suiColour,
      this.suiIconType,
      ClassUtils.getPropClass(this.suiOutline, 'outline'),
      ClassUtils.getPropClass(this.suiLoading, 'loading'),
      ClassUtils.getPropClass(this.suiLink, 'link'),
      'icon'
    ].join(' ');
  }
}
