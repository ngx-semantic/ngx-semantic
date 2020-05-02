/**
 * Created by bolor on 5/2/2020
 */

import {Component, HostBinding, Input} from '@angular/core';
import {SuiSize, SuiVerticalAlignment} from '../common';

export type SuiListRelaxation = 'very' | 'normal' | null;

@Component({
  selector: '[sui-list]',
  template: `
    <ng-content></ng-content>
  `
})
export class SuiListComponent {
  @Input() suiRelaxed: SuiListRelaxation = null;
  @Input() suiSize: SuiSize = null;
  @Input() suiAlignment: SuiVerticalAlignment = null;
  @Input() suiDivided = false;
  @Input() suiBulleted = false;
  @Input() suiOrdered = false;
  @Input() suiLink = false;
  @Input() suiInverted = false;
  @Input() suiHorizontal = false;
  @Input() suiSelection = false;
  @Input() suiAnimated = false;
  @Input() suiCelled = false;

  @HostBinding('class')
  get classes(): string {
    return [
      'ui',
      this.suiSize,
      this.getInverted(),
      this.getRelaxed(),
      this.getDivided(),
      this.getBulleted(),
      this.getOrdered(),
      this.getLink(),
      this.getHorizontal(),
      this.getSelection(),
      this.getAlignment(),
      this.getAnimated(),
      this.getCelled(),
      'list'
    ].join(' ');
  }

  getDivided(): string {
    if (!this.suiDivided) {
      return '';
    }

    return 'divided';
  }

  getRelaxed(): string {
    const classKey = 'relaxed';

    if (!this.suiRelaxed) {
      return '';
    }

    if (this.suiRelaxed === 'very') {
      return 'very' + ' ' + classKey;
    }

    return classKey;
  }

  getBulleted(): string {
    if (!this.suiBulleted) {
      return '';
    }

    return 'bulleted';
  }

  getOrdered(): string {
    if (!this.suiOrdered) {
      return '';
    }

    return 'ordered';
  }

  getLink(): string {
    if (!this.suiLink) {
      return '';
    }

    return 'link';
  }

  getInverted(): string {
    if (!this.suiInverted) {
      return '';
    }

    return 'inverted';
  }

  getHorizontal(): string {
    if (!this.suiHorizontal) {
      return '';
    }

    return 'horizontal';
  }

  getSelection(): string {
    if (!this.suiSelection) {
      return '';
    }

    return 'selection';
  }

  getAnimated(): string {
    if (!this.suiAnimated) {
      return '';
    }

    return 'animated';
  }

  getCelled(): string {
    if (!this.suiCelled) {
      return '';
    }

    return 'celled';
  }

  getAlignment(): string {
    const classKey = 'aligned';

    if (!this.suiAlignment) {
      return '';
    }

    return this.suiAlignment + ' ' + classKey;
  }
}
