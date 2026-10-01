import { expectClasses, expectExactClasses } from '../../test-helpers';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SuiMenuItemDirective, SuiMenuItemFitting } from './menu-item.directive';
import { SuiMenuModule } from './menu.module';
import { SuiColour } from 'ngx-semantic/core/enums';

@Component({
  standalone: true,
  imports: [SuiMenuModule],
  template: `
    <div sui-menu>
      <a suiMenuItem
         [suiColour]="colour"
         [suiFitted]="fitted"
         [suiHeader]="header"
         [suiActive]="active">Item</a>
    </div>`
})
class TestHostComponent {
  colour: SuiColour = null;
  fitted: SuiMenuItemFitting = null;
  header = false;
  active = false;
}

describe('SuiMenuItemDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
    el = fixture.debugElement.query(By.directive(SuiMenuItemDirective)).nativeElement;
  });

  it('should create', () => {
    expect(host).toBeTruthy();
  });

  it('should apply host classes', () => {
    expectExactClasses(el, 'item');
  });

  it('should apply colour, fitted, header and active classes', () => {
    host.colour = 'red';
    host.fitted = 'vertically fitted';
    host.header = true;
    host.active = true;
    fixture.detectChanges();
    expect(el.classList).toContain('red');
    expectClasses(el, 'vertically fitted');
    expect(el.classList).toContain('header');
    expect(el.classList).toContain('active');
  });
});
