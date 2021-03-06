/**
 * Created by bolorundurowb on 1/25/2021
 */

import {AfterContentInit, Component, ContentChildren, Input, QueryList, ViewEncapsulation} from '@angular/core';
import {Utils} from '../../common';
import {SuiAccordionPanelComponent} from './accordion-panel.component';

@Component({
  selector: 'sui-accordion',
  encapsulation: ViewEncapsulation.None,
  template: `
    <div [ngClass]="classes">
      <ng-content></ng-content>
    </div>
  `
})
export class SuiAccordionComponent  implements AfterContentInit {
  @ContentChildren(SuiAccordionPanelComponent) private panels: QueryList<SuiAccordionPanelComponent>;

  @Input() public suiStyled = false;
  @Input() public suiFluid = false;
  @Input() public suiInverted = false;
  @Input() public suiCloseOthers = true;

  get classes(): Array<string> {
    return [
      'ui',
      Utils.getPropClass(this.suiFluid, 'fluid'),
      Utils.getPropClass(this.suiStyled, 'styled'),
      Utils.getPropClass(this.suiInverted, 'inverted'),
      'accordion'
    ].removeWhitespace();
  }

  public ngAfterContentInit() {
    if (this.suiCloseOthers) {
      this.panels
        .forEach((panel, index) => panel.isOpenChange
          .subscribe((x) => {
            // if the panel is being opened, then close others
            if (x) {
              this.panels
                .forEach((y, j) => {
                  if (index !== j) {
                    y.isOpen = false;
                  }
                });
            }
          }));
    }
  }
}

