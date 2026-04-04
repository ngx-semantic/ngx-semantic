import {ComponentFixture, TestBed} from '@angular/core/testing';
import {SuiSidebarModule} from './sidebar.module';
import {SuiSidebarComponent} from './sidebar.component';

describe('SuiSidebarComponent', () => {
  let fixture: ComponentFixture<SuiSidebarComponent>;
  let component: SuiSidebarComponent;
  let host: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuiSidebarModule]
    }).compileComponents();

    fixture = TestBed.createComponent(SuiSidebarComponent);
    component = fixture.componentInstance;
    host = fixture.nativeElement as HTMLElement;
    fixture.componentRef.setInput('suiSidebarPosition', 'left');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply sidebar classes', () => {
    expect(host.className).toContain('ui');
    expect(host.className).toContain('sidebar');
    expect(host.className).toContain('left');
  });

  it('should emit visibleChange when visible input changes', () => {
    const values: boolean[] = [];
    component.visibleChange.subscribe((v) => values.push(v));
    fixture.componentRef.setInput('visible', false);
    fixture.detectChanges();
    expect(values[values.length - 1]).toBe(false);
  });
});
