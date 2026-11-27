import { DOCUMENT, Injectable, Renderer2, inject } from '@angular/core';
import { FocusTrap } from '@angular/cdk/a11y';

interface ModalEntry {
  readonly dialog: HTMLElement;
  readonly trap: FocusTrap;
  opener: HTMLElement | null;
  blurring: boolean;
}

@Injectable({ providedIn: 'root' })
export class ModalStack {
  private readonly document = inject(DOCUMENT);
  private readonly entries: ModalEntry[] = [];
  private readonly bodyClasses = ['dimmable', 'blurring', 'dimmed'];
  private readonly ownedClasses = new Set<string>();
  private nextId = 0;

  public allocateId(): string {
    return 'sui-modal-' + ++this.nextId;
  }

  public open(dialog: HTMLElement, trap: FocusTrap, blurring: boolean, renderer: Renderer2): void {
    const current = this.entries.at(-1);
    if (current) {
      current.trap.enabled = false;
    }
    const entry = { dialog, trap, opener: this.document.activeElement as HTMLElement | null, blurring };
    this.entries.push(entry);
    this.syncBodyClasses(renderer);
    queueMicrotask(() => {
      if (this.entries.at(-1) === entry && !dialog.contains(this.document.activeElement)) {
        this.focus(entry);
      }
    });
  }

  public isTop(dialog: HTMLElement): boolean {
    return this.entries.at(-1)?.dialog === dialog;
  }

  public setBlurring(dialog: HTMLElement, blurring: boolean, renderer: Renderer2): void {
    const entry = this.entries.find(item => item.dialog === dialog);
    if (entry && entry.blurring !== blurring) {
      entry.blurring = blurring;
      this.syncBodyClasses(renderer);
    }
  }

  public close(dialog: HTMLElement, renderer: Renderer2): void {
    const index = this.entries.findIndex(entry => entry.dialog === dialog);
    if (index < 0) {
      return;
    }
    const wasTop = index === this.entries.length - 1;
    const [entry] = this.entries.splice(index, 1);
    entry.trap.destroy();
    for (const remaining of this.entries) {
      if (dialog.contains(remaining.opener)) {
        remaining.opener = entry.opener;
      }
    }
    this.syncBodyClasses(renderer);

    if (wasTop) {
      const next = this.entries.at(-1);
      if (next) {
        next.trap.enabled = true;
      }
      if (entry.opener?.isConnected && (!next || next.dialog.contains(entry.opener))) {
        entry.opener.focus();
      } else if (next) {
        this.focus(next);
      }
    }
  }

  private focus(entry: ModalEntry): void {
    if (!entry.trap.focusInitialElement()) {
      entry.dialog.focus();
    }
  }

  private syncBodyClasses(renderer: Renderer2): void {
    const body = this.document.body;
    if (this.entries.some(entry => entry.blurring)) {
      for (const name of this.bodyClasses) {
        if (!body.classList.contains(name)) {
          renderer.addClass(body, name);
          this.ownedClasses.add(name);
        }
      }
    } else {
      for (const name of this.ownedClasses) {
        renderer.removeClass(body, name);
      }
      this.ownedClasses.clear();
    }
  }
}
