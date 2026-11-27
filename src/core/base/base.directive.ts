/**
 * Created by bolorundurowb on 4/28/2021
 */
import { AfterViewChecked, Directive, ElementRef, inject, Renderer2 } from '@angular/core';

/**
 * Applies the space separated `classes` to the host element in the order they are declared.
 *
 * Semantic UI matches multi-word variations with substring selectors (e.g. `[class*="left labeled"]`),
 * so tokens must stay adjacent and ordered. A host `[class]` binding cannot be used because Angular
 * sorts its tokens alphabetically.
 */
@Directive()
export abstract class BaseDirective implements AfterViewChecked {
  private readonly classHost: HTMLElement = inject(ElementRef).nativeElement;
  private readonly classRenderer = inject(Renderer2);
  private appliedClasses = '';

  // eslint-disable-next-line @angular-eslint/prefer-inject
  constructor(_element?: ElementRef) {
  }

  abstract get classes(): string;

  ngAfterViewChecked(): void {
    this.syncClasses();
  }

  protected syncClasses(): void {
    const next = (this.classes || '').trim().replace(/\s+/g, ' ');
    const current = (this.classHost.getAttribute('class') || '').trim().replace(/\s+/g, ' ');
    const previous = this.appliedClasses;
    const padded = ' ' + current + ' ';
    const start = previous ? padded.lastIndexOf(' ' + previous + ' ') : -1;
    if (next === previous && (start >= 0 || !next)) {
      return;
    }

    let unmanaged = current;
    if (start >= 0) {
      unmanaged = (padded.slice(0, start) + ' ' + padded.slice(start + previous.length + 2)).trim();
    } else if (previous) {
      // Native classList updates can collapse consecutive class phrases into unique tokens.
      const managed = new Set(previous.split(' '));
      unmanaged = current.split(' ').filter(token => !managed.has(token)).join(' ');
    }

    this.classRenderer.setAttribute(this.classHost, 'class', [unmanaged, next].filter(Boolean).join(' '));
    this.appliedClasses = next;
  }
}
