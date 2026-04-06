/**
 * One face of a `sui-shape`. Renders the required Semantic UI `.side` markup.
 */

import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'sui-shape-side',
  encapsulation: ViewEncapsulation.None,
  template: `
    <div
      #root
      class="side"
      [class.active]="styleActive"
      [class.hidden]="styleHidden"
      [class.animating]="styleAnimating"
      [ngStyle]="inlineStyles">
      <ng-content></ng-content>
    </div>
  `
})
export class SuiShapeSideComponent {
  @ViewChild('root', { static: true }) root!: ElementRef<HTMLElement>;

  /** Driven by {@link SuiShapeComponent}; mirrors Semantic UI `.active`. */
  public styleActive = false;
  /** Driven by {@link SuiShapeComponent}; mirrors Semantic UI `.hidden`. */
  public styleHidden = false;
  /** Driven by {@link SuiShapeComponent}; mirrors Semantic UI `.animating`. */
  public styleAnimating = false;
  /** Inline styles applied during 3D animation (transform, top, left). */
  public inlineStyles: Record<string, string | null> = {};

  public get nativeElement(): HTMLElement {
    return this.root.nativeElement;
  }

  public clearInlineStyles(): void {
    this.inlineStyles = {};
  }
}
