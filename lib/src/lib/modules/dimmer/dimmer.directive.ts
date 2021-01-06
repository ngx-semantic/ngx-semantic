/**
 * Created by bolorundurowb on 1/6/2021
 */

import {Directive, EventEmitter, HostBinding, Input, Output} from '@angular/core';
import {Utils} from '../../common';

@Directive({
  selector: '[sui-dimmer]'
})
export class SuiDimmerDirective {
  @Output() public dimmedChanged = new EventEmitter<boolean>();

  // tslint:disable-next-line:variable-name
  private _dimmed = false;

  @Input()
  public set dimmed(isDimmed: boolean) {
    if (isDimmed !== this._dimmed) {
      this._dimmed = isDimmed;
      this.dimmedChanged.emit(this._dimmed);
    }
  }

  public get dimmed(): boolean {
    return this._dimmed;
  }

  @HostBinding('class')
  get classes(): string {
    return [
      'dimmable',
      Utils.getPropClass(this.dimmed, 'dimmed')
    ].joinWithWhitespaceCleanup();
  }
}
