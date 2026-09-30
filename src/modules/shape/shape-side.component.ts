/**
 * One face of a `sui-shape`. The host element itself is the Semantic UI `.side`, so it sits directly inside
 * `.sides` and takes part in the shape's 3D rendering context (an extra wrapper element would flatten it).
 */

import { Component, ElementRef, HostBinding, ViewEncapsulation, inject } from '@angular/core';

@Component({
  standalone: true,
  selector: 'sui-shape-side',
  exportAs: 'suiShapeSide',
  encapsulation: ViewEncapsulation.None,
  template: `
    <ng-content></ng-content>
  `
})
export class SuiShapeSideComponent {
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);

  /** Driven by {@link SuiShapeComponent}; mirrors Semantic UI `.active`. */
  @HostBinding('class.active') public styleActive = false;
  /** Driven by {@link SuiShapeComponent}; mirrors Semantic UI `.hidden`. */
  @HostBinding('class.hidden') public styleHidden = false;
  /** Driven by {@link SuiShapeComponent}; mirrors Semantic UI `.animating`. */
  @HostBinding('class.animating') public styleAnimating = false;
  /** Inline styles applied during 3D animation (transform, top, left). */
  @HostBinding('style') public inlineStyles: Record<string, string | null> = {};

  @HostBinding('class.side') protected readonly sideClass = true;

  public get nativeElement(): HTMLElement {
    return this.element.nativeElement;
  }

  public clearInlineStyles(): void {
    this.inlineStyles = {};
  }
}
