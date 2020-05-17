import {Component, HostBinding, Input} from '@angular/core';

@Component({
  selector: '[sui-step]',
  template: `
    <ng-content></ng-content>
  `
})
export class SuiStepComponent {
  @Input() suiActive = false;
  @Input() suiCompleted = false;
  @Input() suiDisabled = false;

  @HostBinding('class')
  get classes(): string {
    return [
      'step',
      this.getPropClass(this.suiActive, 'active'),
      this.getPropClass(this.suiCompleted, 'completed'),
      this.getPropClass(this.suiDisabled, 'disabled'),
    ].join(' ');
  }

  getPropClass(state: boolean, className: string): string {
    if (!state) {
      return '';
    }

    return className;
  }
}
