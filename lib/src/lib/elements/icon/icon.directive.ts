import {Directive, HostBinding, Input} from '@angular/core';
import {SuiSize, Utils} from '../../common';
import {InputBoolean} from '../../core/util';

export type SuiIconFloatDirection = 'right floated' | null;
export type SuiIconFlipDirection = 'horizontal' | 'vertical' | null;
export type SuiIconRotationDirection = 'clockwise' | 'counterclockwise' | null;

@Directive({
  selector: '[sui-icon]',
  exportAs: 'suiIcon'
})
export class SuiIconDirective {
  @Input() public suiFloat: SuiIconFloatDirection = null;
  @Input() public suiSize: SuiSize = null;
  @Input() public suiFlip: SuiIconFlipDirection = null;
  @Input() public suiRotation: SuiIconRotationDirection = null;
  @Input() public suiIconType: string = null;
  @Input() @InputBoolean() public disabled = false;
  @Input() @InputBoolean() public suiLoading = false;
  @Input() @InputBoolean() public suiFitted = false;
  @Input() @InputBoolean() public suiLink = false;
  @Input() @InputBoolean() public suiCircular = false;
  @Input() @InputBoolean() public suiBordered = false;
  @Input() @InputBoolean() public suiInverted = false;

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
      this.suiIconType,
      this.suiFloat,
      Utils.getPropClass(this.suiLoading, 'loading'),
      Utils.getPropClass(this.suiLink, 'link'),
      'icon'
    ].joinWithWhitespaceCleanup();
  }
}
