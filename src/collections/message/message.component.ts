import {Component, ElementRef, HostBinding, Input} from '@angular/core';
import {SuiColour, SuiSize} from 'ngx-semantic/core/enums';
import {ClassUtils, InputBoolean} from 'ngx-semantic/core/util';
import {SuiResultState} from './enums';

export type SuiMessageAttachment = 'attached' | 'bottom attached' | null;

@Component({
  selector: '[sui-message]',
  template: `
    <i *ngIf="suiDismissible"
       sui-icon
       suiIconType="close"
       (click)="dismiss()"></i>
    <ng-content></ng-content>
  `
})
export class SuiMessageComponent {
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

  constructor(private el: ElementRef) {
  }

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
    const parentElement: HTMLElement = nativeElement.parentElement;
    parentElement.removeChild(nativeElement);
  }
}
