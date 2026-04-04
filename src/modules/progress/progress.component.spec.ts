import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {SuiProgressModule} from './progress.module';
import {SuiProgressComponent} from './progress.component';

describe('SuiProgressComponent', () => {
  let fixture: ComponentFixture<SuiProgressComponent>;
  let component: SuiProgressComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuiProgressModule]
    }).compileComponents();

    fixture = TestBed.createComponent(SuiProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should compute progress percentage from value and max', () => {
    fixture.componentRef.setInput('suiValue', 25);
    fixture.componentRef.setInput('suiMaxValue', 100);
    fixture.detectChanges();
    expect(component.progressPercentage).toBe(25);
  });

  it('should set data-percent on root element', () => {
    fixture.componentRef.setInput('suiValue', 40);
    fixture.componentRef.setInput('suiMaxValue', 80);
    fixture.detectChanges();
    const bar = fixture.debugElement.query(By.css('[data-percent]')).nativeElement as HTMLElement;
    expect(bar.getAttribute('data-percent')).toBe('50');
  });

  it('should show progress text when suiShowProgress is true', () => {
    fixture.componentRef.setInput('suiValue', 10);
    fixture.componentRef.setInput('suiMaxValue', 100);
    fixture.componentRef.setInput('suiShowProgress', true);
    fixture.detectChanges();
    const label = fixture.debugElement.query(By.css('.bar .progress'));
    expect(label).toBeTruthy();
    expect(label.nativeElement.textContent).toContain('%');
  });
});
