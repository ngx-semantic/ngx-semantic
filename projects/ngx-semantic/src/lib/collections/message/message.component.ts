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
  @Input() suiHidden = false;
  @Input() suiVisible = false;
  @Input() suiFloating = false;
  @Input() suiCompact = false;

  @HostBinding('class')
  get classes(): string {
    return [
      'ui',
      Utils.getPropClass(this.suiIcon, 'icon'),
      Utils.getPropClass(this.suiHidden, 'hidden'),
      Utils.getPropClass(this.suiVisible, 'visible'),
      Utils.getPropClass(this.suiFloating, 'floating'),
      Utils.getPropClass(this.suiCompact, 'compact'),
      'message'
    ].joinWithWhitespaceCleanup();
  }
}
