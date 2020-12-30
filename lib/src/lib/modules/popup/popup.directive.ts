import {Directive, Input} from '@angular/core';

@Directive({
  selector: '[sui-popup]'
})
export class SuiPopupDirective {
  @Input() public suiPopupTitle: string;
  @Input() public suiPopupContent: string;
}
