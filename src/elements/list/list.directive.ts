/**
 * Created by bolor on 5/2/2020
 */

import {Directive, HostBinding, Input} from '@angular/core';
import {SuiSize, SuiVerticalAlignment} from 'ngx-semantic/core/enums';
import {InputBoolean} from 'ngx-semantic/core/util';

export type SuiListRelaxation = 'relaxed' | 'very relaxed' | null;

@Directive({
  selector: '[sui-list]',
  exportAs: 'suiList'
})
export class SuiListDirective {
  @Input() public suiRelaxation: SuiListRelaxation = null;
  @Input() public suiSize: SuiSize = null;
  @Input() public suiAlignment: SuiVerticalAlignment = null;
  @Input() @InputBoolean() public suiDivided = false;
  @Input() @InputBoolean() public suiBulleted = false;
  @Input() @InputBoolean() public suiOrdered = false;
  @Input() @InputBoolean() public suiLink = false;
  @Input() @InputBoolean() public suiInverted = false;
  @Input() @InputBoolean() public suiHorizontal = false;
  @Input() @InputBoolean() public suiSelection = false;
  @Input() @InputBoolean() public suiAnimated = false;
  @Input() @InputBoolean() public suiCelled = false;

  @HostBinding('class')
  get classes(): Array<string> {
    return [
      'ui',
      this.suiSize,
      this.suiRelaxation,
      this.getInverted(),
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
    ];
  }

  public getDivided(): string {
    if (!this.suiDivided) {
      return '';
    }

    return 'divided';
  }

  public getBulleted(): string {
    if (!this.suiBulleted) {
      return '';
    }

    return 'bulleted';
  }

  public getOrdered(): string {
    if (!this.suiOrdered) {
      return '';
    }

    return 'ordered';
  }

  public getLink(): string {
    if (!this.suiLink) {
      return '';
    }

    return 'link';
  }

  public getInverted(): string {
    if (!this.suiInverted) {
      return '';
    }

    return 'inverted';
  }

  public getHorizontal(): string {
    if (!this.suiHorizontal) {
      return '';
    }

    return 'horizontal';
  }

  public getSelection(): string {
    if (!this.suiSelection) {
      return '';
    }

    return 'selection';
  }

  public getAnimated(): string {
    if (!this.suiAnimated) {
      return '';
    }

    return 'animated';
  }

  public getCelled(): string {
    if (!this.suiCelled) {
      return '';
    }

    return 'celled';
  }

  public getAlignment(): string {
    const classKey = 'aligned';

    if (!this.suiAlignment) {
      return '';
    }

    return this.suiAlignment + ' ' + classKey;
  }
}
