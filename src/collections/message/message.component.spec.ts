import {Component, Input} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {SuiMessageModule} from './message.module';
import {SuiColour} from 'ngx-semantic/core/enums';

@Component({
  standalone: false,
  template: `
    <div id="wrap">
      <div sui-message
           [suiDismissible]="dismissible"
           [suiColour]="colour"
           [suiCompact]="compact">
        Hello
      </div>
    </div>
  `
})
class HostMessageComponent {
  @Input() dismissible = false;
  @Input() colour: SuiColour | null = null;
  @Input() compact = false;
}

describe('SuiMessageComponent', () => {
  let fixture: ComponentFixture<HostMessageComponent>;
  let host: HostMessageComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuiMessageModule],
      declarations: [HostMessageComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(HostMessageComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should apply base message classes on host', () => {
    const el = fixture.debugElement.query(By.css('[sui-message]')).nativeElement as HTMLElement;
    expect(el.className).toContain('ui');
    expect(el.className).toContain('message');
  });

  it('should apply optional classes from inputs', () => {
    fixture.componentRef.setInput('colour', 'red');
    fixture.componentRef.setInput('compact', true);
    fixture.detectChanges();
    const el = fixture.debugElement.query(By.css('[sui-message]')).nativeElement as HTMLElement;
    expect(el.className).toContain('red');
    expect(el.className).toContain('compact');
  });

  it('should render dismiss icon when suiDismissible is true', () => {
    fixture.componentRef.setInput('dismissible', true);
    fixture.detectChanges();
    const icon = fixture.debugElement.query(By.css('[sui-message] i[sui-icon]'));
    expect(icon).toBeTruthy();
  });

  it('dismiss should remove the message from its parent', () => {
    fixture.componentRef.setInput('dismissible', true);
    fixture.detectChanges();
    const wrap = fixture.debugElement.query(By.css('#wrap')).nativeElement as HTMLElement;
    expect(wrap.querySelector('[sui-message]')).toBeTruthy();

    const iconDe = fixture.debugElement.query(By.css('[sui-message] i[sui-icon]'));
    iconDe.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(wrap.querySelector('[sui-message]')).toBeNull();
  });
});
