import {Directive, HostBinding, Input} from '@angular/core';
import {SuiColour, SuiSize, Utils} from '../../common';
import {InputBoolean} from '../../core/util';

export type SuiIconFlipDirection = 'horizontal' | 'vertical' | null;
export type SuiIconRotationDirection = 'clockwise' | 'counterclockwise' | null;
export type SuiIconCornerPosition = 'top left' | 'top right' | 'bottom left' | 'bottom right' | null;

@Directive({
  selector: '[sui-icon]',
  exportAs: 'suiIcon'
})
export class SuiIconDirective {
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

  @HostBinding('class')
  get classes(): string {
    return [
      Utils.getPropClass(this.suiFitted, 'fitted'),
      Utils.getPropClass(this.disabled, 'disabled'),
      this.suiSize,
      this.suiFlip ? `${this.suiFlip}ly flipped` : '',
      this.suiRotation ? `${this.suiRotation} rotated` : '',
      Utils.getPropClass(this.suiCircular, 'circular'),
      Utils.getPropClass(this.suiBordered, 'bordered'),
      Utils.getPropClass(this.suiInverted, 'inverted'),
      this.suiCorner ? `${this.suiCorner} corner` : '',
      this.suiColour,
      this.suiIconType,
      Utils.getPropClass(this.suiOutline, 'outline'),
      Utils.getPropClass(this.suiLoading, 'loading'),
      Utils.getPropClass(this.suiLink, 'link'),
      'icon'
    ].joinWithWhitespaceCleanup();
  }
}
