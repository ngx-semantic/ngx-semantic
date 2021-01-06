/**
 * Created by bolorundurowb on 1/6/2021
 */

import {Directive, EventEmitter, HostBinding, Input, Output} from '@angular/core';
import {Utils} from '../../common';

export type SuiDimmerContentAlignment = 'top' | 'bottom' | null;

@Directive({
  selector: '[sui-dimmer]'
})
export class SuiDimmerDirective {
@Input() public suiAlignment: SuiDimmerContentAlignment = null;
@Input() public suiBlurring = false;
@Input() public suiInverted = false;
@Input() public suiSimple = false;

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

  @Output() public dimmedChanged = new EventEmitter<boolean>();

  @HostBinding('class')
  get classes(): string {
    return [
      Utils.getPropClass(this.suiBlurring, 'blurring'),
      'dimmable',
      Utils.getPropClass(this.dimmed, 'dimmed')
    ].joinWithWhitespaceCleanup();
  }
}
