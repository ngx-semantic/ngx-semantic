import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SuiDropdownMenuItemDirective } from './dropdown-menu-item.directive';
import { SuiDropdownMenuDirective } from './dropdown-menu.directive';
import { SuiDropdownModule } from './dropdown.module';

@Component({
  standalone: true,
  imports: [SuiDropdownModule],
  template: `<div suiDropdownMenuItem></div>`
})
class TestHostComponent {}

@Component({
  standalone: true,
  imports: [SuiDropdownModule],
  template: `
    <div suiDropdownMenuItem [suiDirection]="'left'" [disabled]="true">
      <div suiDropdownMenu></div>
    </div>
  `
})
class NestedMenuHostComponent {}

describe('SuiDropdownMenuItemDirective', () => {
  afterEach(() => {
    TestBed.resetTestingModule();
  });

  describe('basic host', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    el = fixture.debugElement.query(By.directive(SuiDropdownMenuItemDirective)).nativeElement;
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should apply host classes', () => {
    expect(el.className.trim().length).toBeGreaterThan(0);
    expect(el.className).toContain('item');
  });
  });

  describe('with nested menu', () => {
    let nestedFixture: ComponentFixture<NestedMenuHostComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [NestedMenuHostComponent]
      }).compileComponents();

      nestedFixture = TestBed.createComponent(NestedMenuHostComponent);
      nestedFixture.detectChanges();
    });

    it('should apply direction and disabled classes', () => {
      const item = nestedFixture.debugElement.query(By.directive(SuiDropdownMenuItemDirective));
      expect(item.nativeElement.className).toContain('left');
      expect(item.nativeElement.className).toContain('disabled');
    });

    it('should toggle nested menu visibility on hover', () => {
      const item = nestedFixture.debugElement.query(By.directive(SuiDropdownMenuItemDirective));
      const menu = nestedFixture.debugElement.query(By.directive(SuiDropdownMenuDirective))
        .injector.get(SuiDropdownMenuDirective);

      expect(menu.suiIsOpen).toBe(false);
      item.triggerEventHandler('mouseenter', new MouseEvent('mouseenter'));
      expect(menu.suiIsOpen).toBe(true);
      item.triggerEventHandler('mouseleave', new MouseEvent('mouseleave'));
      expect(menu.suiIsOpen).toBe(false);
    });
  });
});
