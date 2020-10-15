import {Component, ElementRef, HostBinding, Input} from '@angular/core';
import {SuiColour, SuiResultState, SuiSize, Utils} from '../../common';

export type SuiMessageAttachment = 'attached' | 'bottom attached' | null;

@Component({
  selector: '[sui-message]',
  template: `
    <i class="close icon" *ngIf="suiDismissable"
       (click)="dismiss()"></i>
    <ng-content></ng-content>
  `,
})
export class SuiMessageComponent {
  @Input() public suiAttached: SuiMessageAttachment = null;
  @Input() public suiState: SuiResultState = null;
  @Input() public suiSize: SuiSize = null;
  @Input() public suiColour: SuiColour = null;
  @Input() public suiDismissable = false;
  @Input() public suiIcon = false;
  @Input() public suiHidden = false;
  @Input() public suiVisible = false;
  @Input() public suiFloating = false;
  @Input() public suiCompact = false;

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
      Utils.getPropClass(this.suiIcon, 'icon'),
      Utils.getPropClass(this.suiHidden, 'hidden'),
      Utils.getPropClass(this.suiVisible, 'visible'),
      Utils.getPropClass(this.suiFloating, 'floating'),
      Utils.getPropClass(this.suiCompact, 'compact'),
      'message',
    ].joinWithWhitespaceCleanup();
  }

  public dismiss(): void {
    const nativeElement: HTMLElement = this.el.nativeElement;
    const parentElement: HTMLElement = nativeElement.parentElement;
    parentElement.removeChild(nativeElement);
  }
}
