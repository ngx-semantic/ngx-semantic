import {Component, DebugElement, Input} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {SuiDropdownModule} from './dropdown.module';
import {SuiDropdownComponent} from './dropdown.component';
import {SuiDropdownMenuDirective} from './dropdown-menu.directive';

@Component({
  standalone: false,
  template: `
    <sui-dropdown [disabled]="dropdownDisabled">
      <div suiDropdownMenu>Menu</div>
    </sui-dropdown>
  `
})
class HostDropdownComponent {
  @Input() dropdownDisabled = false;
}

describe('SuiDropdownComponent', () => {
  let fixture: ComponentFixture<HostDropdownComponent>;
  let component: SuiDropdownComponent;
  let host: HTMLElement;
  let dropdownDe: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuiDropdownModule],
      declarations: [HostDropdownComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(HostDropdownComponent);
    dropdownDe = fixture.debugElement.query(By.directive(SuiDropdownComponent))!;
    component = dropdownDe.componentInstance as SuiDropdownComponent;
    host = dropdownDe.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should query projected menu', () => {
    expect(component.contentMenu).toBeInstanceOf(SuiDropdownMenuDirective);
  });

  it('should toggle active state and menu open flag on click', () => {
    expect(host.className).not.toMatch(/\bactive\b/);
    host.click();
    fixture.detectChanges();
    expect(host.className).toContain('active');
    expect(component.contentMenu?.suiIsOpen).toBe(true);
    host.click();
    fixture.detectChanges();
    expect(component.contentMenu?.suiIsOpen).toBe(false);
  });

  it('should not toggle when disabled', () => {
    fixture.componentRef.setInput('dropdownDisabled', true);
    fixture.detectChanges();
    host.click();
    fixture.detectChanges();
    expect(host.className).not.toContain('active');
  });
});
