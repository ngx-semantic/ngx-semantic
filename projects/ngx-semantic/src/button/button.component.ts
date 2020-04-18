import {Component, ElementRef, OnInit} from '@angular/core';

export type SuiButtonType = 'primary' | 'secondary' | 'animated' | 'labeled' | 'basic' | null;
export type SuiButtonSize = 'mini' | 'tiny' | 'small' | 'medium' | 'large' | 'big' | 'huge' | 'massive' | null;

@Component({
  selector: 'button[sui-button], a[sui-button]',
  template: `
    <ng-content></ng-content>
  `,
  host: {
    '[class.ui]': `true`,
    '[class.button]': `true`
  }
})
export class SuiButtonComponent {
  constructor(private el: ElementRef) {
  }
}
