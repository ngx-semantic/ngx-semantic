import { ComponentFixture, fakeAsync, flushMicrotasks, TestBed } from '@angular/core/testing';
import { SuiModalModule } from './modal.module';
import { SuiModalComponent } from './modal.component';

describe('SuiModalComponent', () => {
  let fixture: ComponentFixture<SuiModalComponent>;
  let component: SuiModalComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuiModalModule]
    }).compileComponents();

    fixture = TestBed.createComponent(SuiModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should append modal container to document body when visible becomes true', () => {
    component.visible = true;
    fixture.detectChanges();
    expect(document.body.querySelector('.ui.dimmer.modals.page')).toBeTruthy();
  });

  it('should remove visible and active classes from container when hidden', () => {
    component.visible = true;
    fixture.detectChanges();
    const el = document.body.querySelector('.ui.dimmer.modals.page') as HTMLElement;
    expect(el.classList.contains('visible')).toBe(true);
    expect(el.classList.contains('active')).toBe(true);
    component.visible = false;
    fixture.detectChanges();
    expect(el.classList.contains('visible')).toBe(false);
    expect(el.classList.contains('active')).toBe(false);
  });

  it('close icon should set visible to false when suiClosable and not basic', () => {
    fixture.componentRef.setInput('suiClosable', true);
    fixture.componentRef.setInput('suiBasic', false);
    component.visible = true;
    fixture.detectChanges();

    const closeIcon = document.body.querySelector('.modal i[sui-icon]');
    expect(closeIcon).toBeTruthy();
    (closeIcon as HTMLElement).click();
    fixture.detectChanges();
    expect(component.visible).toBe(false);
  });

  it('clears all body dimmer classes when the last blurring modal is destroyed', () => {
    const second = TestBed.createComponent(SuiModalComponent);
    for (const modal of [fixture, second]) {
      modal.componentRef.setInput('suiBlurring', true);
      modal.detectChanges();
      modal.componentInstance.showModal();
    }
    component.hideModal();
    for (const name of ['dimmable', 'blurring', 'dimmed']) {
      expect(document.body.classList).toContain(name);
    }
    second.destroy();
    for (const name of ['dimmable', 'blurring', 'dimmed']) {
      expect(document.body.classList).not.toContain(name);
    }
  });

  it('labels the dialog, moves focus in on open and restores focus on Escape', fakeAsync(() => {
    const opener = document.createElement('button');
    document.body.appendChild(opener);
    try {
      opener.focus();
      fixture.componentRef.setInput('suiHeaderText', 'Dialog heading');
      fixture.componentRef.setInput('visible', true);
      fixture.detectChanges();
      flushMicrotasks();
      const dialog = document.querySelector<HTMLElement>('[role=dialog]')!;
      expect(dialog.getAttribute('aria-modal')).toBe('true');
      expect(document.getElementById(dialog.getAttribute('aria-labelledby')!)?.textContent?.trim()).toBe('Dialog heading');
      expect(dialog.contains(document.activeElement)).toBeTrue();
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', cancelable: true }));
      expect(component.visible).toBeFalse();
      expect(document.activeElement).toBe(opener);
    } finally {
      opener.remove();
    }
  }));

  it('handles Escape only for the topmost closable modal', () => {
    const second = TestBed.createComponent(SuiModalComponent);
    second.detectChanges();
    component.showModal();
    second.componentInstance.showModal();
    const escape = () => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', cancelable: true }));
    second.componentInstance.suiClosable = false;
    escape();
    expect(second.componentInstance.visible).toBeTrue();
    expect(component.visible).toBeTrue();
    second.componentInstance.suiClosable = true;
    escape();
    expect(second.componentInstance.visible).toBeFalse();
    expect(component.visible).toBeTrue();
    second.destroy();
  });
});
