/**
 * Created by bolor on 5/17/2020
 */

import {Directive, HostBinding, Input} from '@angular/core';
import {SuiSize} from 'ngx-semantic/core/enums';
import {ClassUtils, InputBoolean} from 'ngx-semantic/core/util';

export type SuiMoveDirection = 'left' | 'right' | 'up' | 'down' | null;
export type SuiRotateDirection = 'left' | 'right' | null;

@Directive({
  selector: '[sui-reveal]',
  exportAs: 'suiReveal'
})
export class SuiRevealDirective {
  @Input() public suiMove: SuiMoveDirection = null;
  @Input() public suiRotate: SuiRotateDirection = null;
  @Input() public suiSize: SuiSize = null;
  @Input() @InputBoolean() public suiFade = false;
  @Input() @InputBoolean() public suiActive = false;
  @Input() @InputBoolean() public suiInstant = false;
  @Input() @InputBoolean() public disabled = false;

  @HostBinding('class')
  get classes(): string {
    return [
      'ui',
      this.suiSize,
      ClassUtils.getPropClass(this.suiActive, 'active'),
      ClassUtils.getPropClass(this.disabled, 'disabled'),
      ClassUtils.getPropClass(this.suiInstant, 'instant'),
      ClassUtils.getPropClass(this.suiFade, 'fade'),
      this.getRotate(),
      this.getMove(),
      'reveal'
    ].join(' ');
  }

  public getRotate(): string {
    const classKey = 'rotate';

    if (!this.suiRotate) {
      return '';
    }

    if (this.suiRotate === 'left') {
      return 'left ' + classKey;
    }

    return classKey;
  }

  public getMove(): string {
    const classKey = 'move';

    if (!this.suiMove) {
      return '';
    }

    if (this.suiMove === 'left') {
      return classKey;
    }

    return this.suiMove + ' ' + classKey;
  }
}
