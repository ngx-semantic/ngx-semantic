import {Component, ElementRef, OnInit} from '@angular/core';

@Component({
  selector: '[sui-button]',
  template: `
    <ng-content></ng-content>
  `
})
export class SuiButtonComponent implements OnInit {

  constructor(private el: ElementRef) { }

  ngOnInit(): void {
  }

}
