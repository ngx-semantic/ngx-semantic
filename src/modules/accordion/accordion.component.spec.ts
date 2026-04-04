import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {SuiAccordionModule} from './accordion.module';
import {SuiAccordionComponent} from './accordion.component';
import {SuiAccordionPanelComponent} from './accordion-panel.component';

describe('SuiAccordionComponent', () => {
  let fixture: ComponentFixture<SuiAccordionComponent>;
  let component: SuiAccordionComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuiAccordionModule]
    }).compileComponents();

    fixture = TestBed.createComponent(SuiAccordionComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('suiStyled', true);
    fixture.componentRef.setInput('suiFluid', true);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply accordion classes on wrapper', () => {
    const div = fixture.debugElement.query(By.css('div')).nativeElement as HTMLElement;
    expect(div.className).toContain('ui');
    expect(div.className).toContain('accordion');
    expect(div.className).toContain('styled');
    expect(div.className).toContain('fluid');
  });
});

describe('SuiAccordionPanelComponent', () => {
  let fixture: ComponentFixture<SuiAccordionPanelComponent>;
  let component: SuiAccordionPanelComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuiAccordionModule]
    }).compileComponents();

    fixture = TestBed.createComponent(SuiAccordionPanelComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('suiTitle', 'Section');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle open state when title is clicked', () => {
    expect(component.isOpen).toBe(false);
    const title = fixture.debugElement.query(By.css('.title'));
    title.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.isOpen).toBe(true);
    title.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.isOpen).toBe(false);
  });

  it('should not toggle when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    const title = fixture.debugElement.query(By.css('.title'));
    title.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.isOpen).toBe(false);
  });
});
