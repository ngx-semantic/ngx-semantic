import {Directive, HostBinding} from "@angular/core";

@Directive({
  selector: '[sui-message-header]'
})
export class SuiMessageHeaderDirective {
  @HostBinding('class')
  get classes(): string {
    return [
      'header'
    ].joinWithWhitespaceCleanup();
  }
}
