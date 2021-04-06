/**
 * Created by bolorundurowb on 1/25/2021
 */

import {AfterContentInit, Component, ContentChildren, Input, QueryList, ViewEncapsulation} from '@angular/core';
import {ClassUtils} from 'ngx-semantic/core/util';
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
      ClassUtils.getPropClass(this.suiFluid, 'fluid'),
      ClassUtils.getPropClass(this.suiStyled, 'styled'),
      ClassUtils.getPropClass(this.suiInverted, 'inverted'),
      'accordion'
    ];
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

