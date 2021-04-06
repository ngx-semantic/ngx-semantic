import {Directive, HostBinding, Input} from '@angular/core';
import {SuiColour, SuiSize} from 'ngx-semantic/core/enums';
import {ClassUtils, InputBoolean} from 'ngx-semantic/core/util';

export type SuiHeaderAlignment = 'left aligned' | 'right aligned' | 'center aligned' | 'justified' | null;
export type SuiHeaderAttachment = 'attached' | 'top attached' | 'bottom attached' | null;
export type SuiHeaderFloating = 'left floated' | 'right floated' | null;

@Directive({
  selector: '[sui-header]',
  exportAs: 'suiHeader'
})
export class SuiHeaderDirective {
  @Input() public suiSize: SuiSize = null;
  @Input() public suiAlignment: SuiHeaderAlignment = null;
  @Input() public suiColour: SuiColour = null;
  @Input() public suiAttached: SuiHeaderAttachment = null;
  @Input() public suiFloated: SuiHeaderFloating = null;
  @Input() @InputBoolean() public suiSubHeader = false;
  @Input() @InputBoolean() public disabled = false;
  @Input() @InputBoolean() public suiDividing = false;
  @Input() @InputBoolean() public suiBlock = false;
  @Input() @InputBoolean() public suiInverted = false;
  @Input() @InputBoolean() public suiIcon = false;

  @HostBinding('class')
  get classes(): string {
    return [
      'ui',
      this.suiColour,
      this.suiSize,
      this.suiAttached,
      this.suiFloated,
      this.suiAlignment,
      ClassUtils.getPropClass(this.suiDividing, 'dividing'),
      ClassUtils.getPropClass(this.disabled, 'disabled'),
      ClassUtils.getPropClass(this.suiInverted, 'inverted'),
      ClassUtils.getPropClass(this.suiBlock, 'block'),
      ClassUtils.getPropClass(this.suiSubHeader, 'sub'),
      ClassUtils.getPropClass(this.suiIcon, 'icon'),
      'header'
    ].join(' ');
  }
}
