import {Component, HostBinding} from "@angular/core";

@Component({
  selector: '[sui-message]',
  template: `
    <ng-content></ng-content>
  `
})
export class SuiMessageComponent {
  @HostBinding('class')
  get classes(): string {
    return [
      'ui',
      'message'
    ].joinWithWhitespaceCleanup();
  }
}
