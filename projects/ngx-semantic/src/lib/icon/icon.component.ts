import {Component, HostBinding, Input, OnInit} from '@angular/core';

@Component({
  selector: '[sui-icon]',
  template: `
    <ng-content></ng-content>
  `
})
export class SuiIconComponent implements OnInit {
  @HostBinding('class') classes = 'icon';
  @Input() suiIconType = '';

  constructor() {
  }

  ngOnInit(): void {
    if (this.suiIconType) {
      this.classes = this.suiIconType + ' ' + this.classes;
    }
  }
}
