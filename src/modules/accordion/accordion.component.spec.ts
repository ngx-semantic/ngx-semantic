import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {SuiAccordionModule} from './accordion.module';
import {SuiAccordionComponent} from './accordion.component';

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
