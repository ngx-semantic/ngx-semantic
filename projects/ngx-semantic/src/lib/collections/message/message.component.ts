import {Component, HostBinding, Input} from "@angular/core";
import {Utils} from "../../common";

@Component({
  selector: '[sui-message]',
  template: `
    <ng-content></ng-content>
  `
})
export class SuiMessageComponent {
  @Input() suiIcon = false;

  @HostBinding('class')
  get classes(): string {
    return [
      'ui',
      Utils.getPropClass(this.suiIcon, 'icon'),
      'message'
    ].joinWithWhitespaceCleanup();
  }
}
