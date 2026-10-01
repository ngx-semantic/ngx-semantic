/**
 * Created by bolorundurowb on 4/28/2021
 */
import { Directive, DoCheck, ElementRef, inject, Renderer2 } from '@angular/core';

/**
 * Applies the space separated `classes` to the host element in the order they are declared.
 *
 * Semantic UI matches multi-word variations with substring selectors (e.g. `[class*="left labeled"]`),
 * so tokens must stay adjacent and ordered. A host `[class]` binding cannot be used because Angular
 * sorts its tokens alphabetically.
 */
@Directive()
export abstract class BaseDirective implements DoCheck {
  private readonly classHost: HTMLElement = inject(ElementRef).nativeElement;
  private readonly classRenderer = inject(Renderer2);
  private staticClasses: Set<string> | null = null;
  private appliedClasses: string[] = [];

  // eslint-disable-next-line @angular-eslint/prefer-inject
  constructor(_element?: ElementRef) {
  }

  abstract get classes(): string;

  ngDoCheck(): void {
    this.syncClasses();
  }

  protected syncClasses(): void {
    const next = (this.classes || '').split(/\s+/).filter(Boolean);
    const unique = Array.from(new Set(next));

    if (unique.length === this.appliedClasses.length && unique.every((c, i) => c === this.appliedClasses[i])) {
      return;
    }

    if (!this.staticClasses) {
      this.staticClasses = new Set(Array.from(this.classHost.classList));
    }

    const keep = new Set(unique);
    for (const c of this.appliedClasses) {
      if (!keep.has(c) && !this.staticClasses.has(c)) {
        this.classRenderer.removeClass(this.classHost, c);
      }
    }

    // classList.add() leaves existing tokens in place, so re-adding is needed to restore the order
    for (const c of unique) {
      this.classRenderer.removeClass(this.classHost, c);
    }
    for (const c of unique) {
      this.classRenderer.addClass(this.classHost, c);
    }

    this.appliedClasses = unique;
  }
}
