import {Component, HostBinding, Input} from '@angular/core';

@Component({
  selector: '[sui-icon]',
  template: `
    <ng-content></ng-content>
  `
})
export class SuiIconComponent {
  @Input() public suiIconType = '';

  @HostBinding('class')
  get classes(): string {
    return [this.suiIconType, 'icon'].joinWithWhitespaceCleanup();
  }
}
