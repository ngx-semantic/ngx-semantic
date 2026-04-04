import {ComponentFixture, TestBed} from '@angular/core/testing';
import {SuiSidebarModule} from './sidebar.module';
import {SuiSidebarPusherComponent} from './sidebar-pusher.component';

describe('SuiSidebarPusherComponent', () => {
  let fixture: ComponentFixture<SuiSidebarPusherComponent>;
  let component: SuiSidebarPusherComponent;
  let host: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuiSidebarModule]
    }).compileComponents();

    fixture = TestBed.createComponent(SuiSidebarPusherComponent);
    component = fixture.componentInstance;
    host = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add dimmed class when sidebar is open and suiDimmable is true', () => {
    fixture.componentRef.setInput('suiDimmable', true);
    component.isSidebarOpen = true;
    fixture.detectChanges();
    expect(host.className).toContain('dimmed');
  });
});
