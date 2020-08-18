/**
 * Created by bolor on 8/17/2020
 */

import {Component, Host, HostBinding, Input, Optional, TemplateRef} from '@angular/core';
import {SuiColour, Utils} from '../../common';
import {SuiCardsComponent} from './cards.component';

@Component({
  selector: '[sui-card]',
  template: `
    <ng-container *ngFor="let content of suiContent">
      <div class="content">
        <ng-container>{{content}}</ng-container>
      </div>
    </ng-container>
    <div *ngIf="suiExtra" class="extra content">
      <ng-container>{{suiExtra}}</ng-container>
    </div>
    <ng-content></ng-content>
  `
})
export class SuiCardComponent {
  @Input() suiExtra?: string | TemplateRef<any>;
  @Input() suiContent?: Array<TemplateRef<any>> = [];
  @Input() suiColour: SuiColour = null;
  @Input() suiLink = false;
  @Input() suiCentered = false;
  @Input() suiFluid = false;
  @Input() suiRaised = false;

  private isChildComponent: boolean;

  @HostBinding('class')
  get classes(): string {
    return [
      this.isChildComponent ? '' : 'ui',
      this.suiColour,
      Utils.getPropClass(this.suiRaised, 'raised'),
      Utils.getPropClass(this.suiLink, 'link'),
      Utils.getPropClass(this.suiCentered, 'centered'),
      Utils.getPropClass(this.suiFluid, 'fluid'),
      'card'
    ].joinWithWhitespaceCleanup();
  }

  constructor(@Optional() @Host() private parent: SuiCardsComponent) {
    this.isChildComponent = !!parent;
  }
}
