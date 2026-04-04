import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {SuiCheckboxModule} from './checkbox.module';
import {SuiCheckboxComponent} from './checkbox.component';

describe('SuiCheckboxComponent', () => {
  let fixture: ComponentFixture<SuiCheckboxComponent>;
  let component: SuiCheckboxComponent;
  let host: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuiCheckboxModule]
    }).compileComponents();

    fixture = TestBed.createComponent(SuiCheckboxComponent);
    component = fixture.componentInstance;
    host = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply ui checkbox classes', () => {
    expect(host.className).toContain('ui');
    expect(host.className).toContain('checkbox');
  });

  it('should toggle checked on click for default checkbox', () => {
    expect(component.isChecked).toBe(false);
    host.click();
    fixture.detectChanges();
    expect(component.isChecked).toBe(true);
  });

  it('should not toggle when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    host.click();
    expect(component.isChecked).toBe(false);
  });

  it('should set radio input type when suiType is radio', () => {
    fixture.componentRef.setInput('suiType', 'radio');
    fixture.componentRef.setInput('suiValue', 'a');
    fixture.detectChanges();
    const input = fixture.debugElement.query(By.css('input')).nativeElement as HTMLInputElement;
    expect(input.type).toBe('radio');
  });

  it('writeValue should set checked state for radio based on suiValue', () => {
    fixture.componentRef.setInput('suiType', 'radio');
    fixture.componentRef.setInput('suiValue', 'x');
    fixture.detectChanges();
    component.writeValue('x');
    fixture.detectChanges();
    expect(component.isChecked).toBe(true);
  });
});
