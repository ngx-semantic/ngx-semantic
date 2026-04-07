import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SuiSelectMenuDirective } from './select-menu.directive';

@Component({
  standalone: true,
  imports: [SuiSelectMenuDirective],
  template: `<div suiSelectMenu></div>`
})
class TestHostComponent {}

@Component({
  standalone: true,
  imports: [SuiSelectMenuDirective],
  template: `
    <div suiSelectMenu [suiIsOpen]="true" [suiScrolling]="true" [suiDirection]="'left'"></div>
  `
})
class OpenMenuHost {}

describe('SuiSelectMenuDirective', () => {
  afterEach(() => {
    TestBed.resetTestingModule();
  });

  describe('default', () => {
    let fixture: ComponentFixture<TestHostComponent>;
    let el: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestHostComponent]
      }).compileComponents();

      fixture = TestBed.createComponent(TestHostComponent);
      fixture.detectChanges();
      el = fixture.debugElement.query(By.directive(SuiSelectMenuDirective)).nativeElement;
    });

    it('should create', () => {
      expect(fixture.componentInstance).toBeTruthy();
    });

    it('should apply host classes', () => {
      expect(el.className.trim().length).toBeGreaterThan(0);
      expect(el.className).toContain('hidden');
      expect(el.className).toContain('menu');
    });

    it('tabIndex should be -1', () => {
      const d = fixture.debugElement.query(By.directive(SuiSelectMenuDirective)).injector.get(SuiSelectMenuDirective);
      expect(d.tabIndex).toBe(-1);
    });
  });

  describe('open menu', () => {
    let fixture: ComponentFixture<OpenMenuHost>;
    let dir: SuiSelectMenuDirective;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [OpenMenuHost]
      }).compileComponents();

      fixture = TestBed.createComponent(OpenMenuHost);
      fixture.detectChanges();
      dir = fixture.debugElement.query(By.directive(SuiSelectMenuDirective)).injector.get(SuiSelectMenuDirective);
    });

    it('should show visible when open with scrolling and direction', () => {
      const el = fixture.nativeElement.firstElementChild as HTMLElement;
      expect(dir.suiIsOpen).toBe(true);
      expect(el.className).toContain('visible');
      expect(el.className).toContain('scrolling');
      expect(el.className).toContain('left');
    });
  });
});
