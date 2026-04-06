import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {SuiRatingModule} from './rating.module';
import {SuiRatingComponent} from './rating.component';

describe('SuiRatingComponent', () => {
  let fixture: ComponentFixture<SuiRatingComponent>;
  let component: SuiRatingComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuiRatingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(SuiRatingComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('suiMaxValue', 3);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render one icon per max value', () => {
    const icons = fixture.debugElement.queryAll(By.css('.icon'));
    expect(icons.length).toBe(3);
  });

  it('should update value on icon click', () => {
    const icons = fixture.debugElement.queryAll(By.css('.icon'));
    icons[1].triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.suiValue).toBe(2);
  });

  it('should not change value when read-only', () => {
    fixture.componentRef.setInput('suiReadOnly', true);
    fixture.detectChanges();
    const icons = fixture.debugElement.queryAll(By.css('.icon'));
    icons[2].triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.suiValue).toBe(0);
  });

  it('writeValue should set suiValue', () => {
    component.writeValue(2);
    fixture.detectChanges();
    expect(component.suiValue).toBe(2);
  });
});
