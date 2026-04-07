import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SuiSidebarModule } from './sidebar.module';
import { SuiSidebarPusherComponent } from './sidebar-pusher.component';
import { SuiSidebarService } from './sidebar.service';

describe('SuiSidebarPusherComponent', () => {
  let fixture: ComponentFixture<SuiSidebarPusherComponent>;
  let component: SuiSidebarPusherComponent;
  let host: HTMLElement;
  let sidebarService: SuiSidebarService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuiSidebarModule]
    }).compileComponents();

    fixture = TestBed.createComponent(SuiSidebarPusherComponent);
    component = fixture.componentInstance;
    host = fixture.nativeElement as HTMLElement;
    sidebarService = TestBed.inject(SuiSidebarService);
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

  it('should update isSidebarOpen when service emits visibility', () => {
    sidebarService.changeVisibility(true);
    expect(component.isSidebarOpen).toBe(true);
    sidebarService.changeVisibility(false);
    expect(component.isSidebarOpen).toBe(false);
  });

  it('should notify service when clicked while sidebar open', () => {
    spyOn(sidebarService, 'notifyPusherClicked');
    component.isSidebarOpen = true;
    host.dispatchEvent(new Event('click'));
    expect(sidebarService.notifyPusherClicked).toHaveBeenCalled();
  });

  it('should not notify service when sidebar closed', () => {
    spyOn(sidebarService, 'notifyPusherClicked');
    component.isSidebarOpen = false;
    host.dispatchEvent(new Event('click'));
    expect(sidebarService.notifyPusherClicked).not.toHaveBeenCalled();
  });
});
