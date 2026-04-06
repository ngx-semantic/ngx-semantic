import { Component, ElementRef, HostBinding, Input, inject } from '@angular/core';
import { SuiIconDirective } from 'ngx-semantic/elements/icon';
import { SuiColour, SuiSize } from 'ngx-semantic/core/enums';
import { ClassUtils, InputBoolean } from 'ngx-semantic/core/util';
import { SuiResultState } from './enums';

export type SuiMessageAttachment = 'attached' | 'bottom attached' | null;

@Component({
  standalone: true,
  imports: [SuiIconDirective],
  selector: '[sui-message]',
  template: `
    @if (suiDismissible) {
      <i sui-icon
         suiIconType="close"
         (click)="dismiss()"></i>
    }
    <ng-content></ng-content>
  `
})
export class SuiMessageComponent {
  private el = inject(ElementRef);

  @Input() public suiAttached: SuiMessageAttachment = null;
  @Input() public suiState: SuiResultState = null;
  @Input() public suiSize: SuiSize = null;
  @Input() public suiColour: SuiColour = null;
  @Input() @InputBoolean() public suiDismissible = false;
  @Input() @InputBoolean() public suiIcon = false;
  @Input() @InputBoolean() public suiHidden = false;
  @Input() @InputBoolean() public suiVisible = false;
  @Input() @InputBoolean() public suiFloating = false;
  @Input() @InputBoolean() public suiCompact = false;

  @HostBinding('class')
  get classes(): string {
    return [
      'ui',
      this.suiAttached,
      this.suiState,
      this.suiSize,
      this.suiColour,
      ClassUtils.getPropClass(this.suiIcon, 'icon'),
      ClassUtils.getPropClass(this.suiHidden, 'hidden'),
      ClassUtils.getPropClass(this.suiVisible, 'visible'),
      ClassUtils.getPropClass(this.suiFloating, 'floating'),
      ClassUtils.getPropClass(this.suiCompact, 'compact'),
      'message'
    ].join(' ');
  }

  public dismiss(): void {
    const nativeElement: HTMLElement = this.el.nativeElement;
    const parentElement = nativeElement.parentElement;
    if (parentElement) {
      parentElement.removeChild(nativeElement);
    }
  }
}
