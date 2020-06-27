import {Directive, HostBinding} from "@angular/core";

@Directive({
  selector: '[sui-message-content]'
})
export class SuiMessageContentDirective {
  @HostBinding('class')
  get classes(): string {
    return [
      'content'
    ].joinWithWhitespaceCleanup();
  }
}
