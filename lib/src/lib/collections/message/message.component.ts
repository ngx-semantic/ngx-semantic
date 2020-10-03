import {Component, ElementRef, HostBinding, Input} from '@angular/core';
import {SuiColour, SuiResultState, SuiSize, Utils} from '../../common';

export type SuiMessageAttachment = 'attached' | 'bottom attached' | null;

@Component({
  selector: '[sui-message]',
  template: `
    <i class="close icon" *ngIf="suiDismissable"
       (click)="dismiss()"></i>
    <ng-content></ng-content>
  `
})
export class SuiMessageComponent {
  @Input() suiAttached: SuiMessageAttachment = null;
  @Input() suiState: SuiResultState = null;
  @Input() suiSize: SuiSize = null;
  @Input() suiColour: SuiColour = null;
  @Input() suiDismissable = false;
  @Input() suiIcon = false;
  @Input() suiHidden = false;
  @Input() suiVisible = false;
  @Input() suiFloating = false;
  @Input() suiCompact = false;

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
      'message'
    ].joinWithWhitespaceCleanup();
  }

  dismiss(): void {
    const nativeElement: HTMLElement = this.el.nativeElement;
    const parentElement: HTMLElement = nativeElement.parentElement;
    parentElement.removeChild(nativeElement);
  }
}
