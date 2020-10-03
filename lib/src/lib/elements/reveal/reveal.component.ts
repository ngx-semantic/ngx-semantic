/**
 * Created by bolor on 5/17/2020
 */

import {Component, HostBinding, Input} from '@angular/core';
import {SuiSize, Utils} from '../../common';

export type SuiMoveDirection = 'left' | 'right' | 'up' | 'down' | null;
export type SuiRotateDirection = 'left' | 'right' | null;

@Component({
  selector: '[sui-reveal]',
  template: `
    <ng-content></ng-content>
  `
})
export class SuiRevealComponent {
  @Input() suiMove: SuiMoveDirection = null;
  @Input() suiRotate: SuiRotateDirection = null;
  @Input() suiSize: SuiSize = null;
  @Input() suiFade = false;
  @Input() suiActive = false;
  @Input() suiInstant = false;
  @Input() suiDisabled = false;
  @Input() suiCircular = false;
  @Input() suiImage = false;

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

  getRotate(): string {
    const classKey = 'rotate';

    if (!this.suiRotate) {
      return '';
    }

    if (this.suiRotate === 'left') {
      return 'left ' + classKey;
    }

    return classKey;
  }

  getMove(): string {
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
