import {Component, ViewChild} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {SuiFormValidationDirective} from './form-validation.directive';

@Component({
  standalone: true,
  imports: [SuiFormValidationDirective],
  template: `
    <form suiFormValidation [suiFields]="fields" [suiInline]="true" #fv="suiFormValidation">
      <div class="field">
        <label for="email">Email</label>
        <input id="email" name="email" type="text" />
      </div>
      <button type="submit">Submit</button>
    </form>
  `
})
class HostFormComponent {
  @ViewChild('fv') fv!: SuiFormValidationDirective;
  fields = {email: ['empty', 'email']};
}

describe('SuiFormValidationDirective', () => {
  let fixture: ComponentFixture<HostFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostFormComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(HostFormComponent);
    fixture.detectChanges();
  });

  it('blocks submit when a rule fails', () => {
    const form = fixture.debugElement.query(By.css('form')).nativeElement as HTMLFormElement;
    const ev = new Event('submit', {cancelable: true, bubbles: true});
    const pd = spyOn(ev, 'preventDefault').and.callThrough();
    form.dispatchEvent(ev);
    expect(pd).toHaveBeenCalled();
  });

  it('allows submit when valid', () => {
    const input = fixture.debugElement.query(By.css('#email')).nativeElement as HTMLInputElement;
    input.value = 'ok@example.com';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const form = fixture.debugElement.query(By.css('form')).nativeElement as HTMLFormElement;
    const ev = new Event('submit', {cancelable: true, bubbles: true});
    const pd = spyOn(ev, 'preventDefault').and.callThrough();
    form.dispatchEvent(ev);
    expect(pd).not.toHaveBeenCalled();
  });

  it('validateForm reflects isValid', () => {
    const dir = fixture.componentInstance.fv;
    expect(dir.isValid()).toBe(false);
    expect(dir.validateForm()).toBe(false);
    const input = fixture.debugElement.query(By.css('#email')).nativeElement as HTMLInputElement;
    input.value = 'ok@example.com';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(dir.isValid()).toBe(true);
  });
});
