import {Component, HostBinding, Input, OnInit} from '@angular/core';

@Component({
  selector: '[sui-flag]',
  template: `
    <ng-content></ng-content>
  `
})
export class SuiFlagComponent implements OnInit {
  @HostBinding('class') classes = 'flag';
  @Input() suiCountry = '';

  constructor() {
  }

  ngOnInit(): void {
    if (this.suiCountry) {
      this.classes += this.suiCountry;
    }
  }
}
