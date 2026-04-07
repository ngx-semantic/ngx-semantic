import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SuiRevealDirective } from './reveal.directive';

@Component({
  standalone: true,
  imports: [SuiRevealDirective],
  template: `<div sui-reveal></div>`
})
class TestHostComponent {}

@Component({
  standalone: true,
  imports: [SuiRevealDirective],
  template: `
    <div
      sui-reveal
      [suiMove]="'right'"
      [suiRotate]="'left'"
      suiSize="small"
      [suiFade]="true"
      [suiActive]="true"
      [suiInstant]="true"
      [disabled]="true"></div>
  `
})
class FullRevealHost {}

describe('SuiRevealDirective', () => {
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
      el = fixture.debugElement.query(By.directive(SuiRevealDirective)).nativeElement;
    });

    it('should create', () => {
      expect(fixture.componentInstance).toBeTruthy();
    });

    it('should apply host classes', () => {
      expect(el.className.trim().length).toBeGreaterThan(0);
      expect(el.className).toContain('reveal');
    });
  });

  describe('full options', () => {
    let fixture: ComponentFixture<FullRevealHost>;
    let dir: SuiRevealDirective;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [FullRevealHost]
      }).compileComponents();

      fixture = TestBed.createComponent(FullRevealHost);
      fixture.detectChanges();
      dir = fixture.debugElement.query(By.directive(SuiRevealDirective)).injector.get(SuiRevealDirective);
    });

    it('should include move, rotate, size, and state classes', () => {
      const el = fixture.nativeElement.querySelector('[sui-reveal]') as HTMLElement;
      expect(el.className).toContain('small');
      expect(el.className).toContain('active');
      expect(el.className).toContain('fade');
      expect(el.className).toContain('instant');
      expect(el.className).toContain('disabled');
      const tokens = el.className.split(/\s+/).filter(Boolean);
      expect(tokens).toContain('right');
      expect(tokens).toContain('move');
      expect(tokens).toContain('left');
      expect(tokens).toContain('rotate');
    });

    it('getRotate should return empty when unset', () => {
      dir.suiRotate = null;
      expect(dir.getRotate()).toBe('');
    });

    it('getRotate right uses rotate class only', () => {
      dir.suiRotate = 'right';
      expect(dir.getRotate()).toBe('rotate');
    });

    it('getMove should return empty when unset', () => {
      dir.suiMove = null;
      expect(dir.getMove()).toBe('');
    });

    it('getMove left returns move', () => {
      dir.suiMove = 'left';
      expect(dir.getMove()).toBe('move');
    });

    it('getMove up/down/right prefix move', () => {
      dir.suiMove = 'up';
      expect(dir.getMove()).toBe('up move');
      dir.suiMove = 'down';
      expect(dir.getMove()).toBe('down move');
      dir.suiMove = 'right';
      expect(dir.getMove()).toBe('right move');
    });
  });
});
