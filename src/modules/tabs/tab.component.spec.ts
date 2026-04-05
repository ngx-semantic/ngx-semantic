import {Component, Input} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {SuiTabsModule} from './tabs.module';
import {SuiTabComponent} from './tab.component';

@Component({
  standalone: true,
  imports: [SuiTabsModule],
  template: `
    <sui-tab suiTitle="T" [disabled]="disabled">Body</sui-tab>
  `
})
class HostTabComponent {
  @Input() disabled = false;
}

describe('SuiTabComponent', () => {
  let fixture: ComponentFixture<HostTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostTabComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(HostTabComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should expose content template', () => {
    const tabDe = fixture.debugElement.query(By.directive(SuiTabComponent));
    const tab = tabDe.componentInstance as SuiTabComponent;
    expect(tab.contentTemplate).toBeTruthy();
  });

  it('should apply disabled class when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    const tabEl = fixture.debugElement.query(By.directive(SuiTabComponent)).nativeElement as HTMLElement;
    expect(tabEl.className).toContain('disabled');
  });
});
