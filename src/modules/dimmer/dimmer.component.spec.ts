import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SuiDimmerComponent } from './dimmer.component';

@Component({
  standalone: true,
  imports: [SuiDimmerComponent],
  template: `
    <ng-template #tpl><span>inner</span></ng-template>
    <sui-dimmer [suiContent]="tpl" [suiInverted]="true" [suiSimple]="true"></sui-dimmer>
  `
})
class HostDimmerComponent {
}

describe('SuiDimmerComponent', () => {
  let fixture: ComponentFixture<HostDimmerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostDimmerComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(HostDimmerComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render dimmer with expected classes', () => {
    const dimmer = fixture.debugElement.query(By.css('sui-dimmer div')).nativeElement as HTMLElement;
    expect(dimmer.className).toContain('ui');
    expect(dimmer.className).toContain('dimmer');
    expect(dimmer.className).toContain('inverted');
    expect(dimmer.className).toContain('simple');
  });

  it('should project template content when suiContent is set', () => {
    const inner = fixture.debugElement.query(By.css('sui-dimmer .content span'));
    expect(inner).toBeTruthy();
    expect(inner.nativeElement.textContent).toContain('inner');
  });
});
