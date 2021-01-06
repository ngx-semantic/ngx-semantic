/**
 * Created by bolor on 5/17/2020
 */

import {Directive, HostBinding, Input} from '@angular/core';
import {SuiSize, Utils} from '../../common';

export type SuiMoveDirection = 'left' | 'right' | 'up' | 'down' | null;
export type SuiRotateDirection = 'left' | 'right' | null;

@Directive({
  selector: '[sui-reveal]'
})
export class SuiRevealDirective {
  @Input() public suiMove: SuiMoveDirection = null;
  @Input() public suiRotate: SuiRotateDirection = null;
  @Input() public suiSize: SuiSize = null;
  @Input() public suiFade = false;
  @Input() public suiActive = false;
  @Input() public suiInstant = false;
  @Input() public suiDisabled = false;
  @Input() public suiCircular = false;
  @Input() public suiImage = false;

  @HostBinding('class')
  get classes(): string {
    return [
      'ui',
      this.suiSize,
      Utils.getPropClass(this.suiActive, 'active'),
      Utils.getPropClass(this.suiDisabled, 'disabled'),
      Utils.getPropClass(this.suiCircular, 'circular'),
      Utils.getPropClass(this.suiInstant, 'instant'),
      Utils.getPropClass(this.suiFade, 'fade'),
      this.getRotate(),
      this.getMove(),
      'reveal',
      Utils.getPropClass(this.suiImage, 'image')
    ].joinWithWhitespaceCleanup();
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
