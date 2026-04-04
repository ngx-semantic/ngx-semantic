import {Component} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {SuiSidebarModule} from './sidebar.module';
import {SuiSidebarComponent} from './sidebar.component';
import {SuiSidebarPusherComponent} from './sidebar-pusher.component';
import {SuiSidebarContainerComponent} from './sidebar-container.component';

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

@Component({
  standalone: false,
  template: `
    <sui-sidebar-container>
      <sui-sidebar [visible]="true">Nav</sui-sidebar>
      <sui-sidebar-pusher>Main</sui-sidebar-pusher>
    </sui-sidebar-container>
  `
})
class HostSidebarContainerComponent {
}

describe('SuiSidebarContainerComponent', () => {
  let fixture: ComponentFixture<HostSidebarContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuiSidebarModule],
      declarations: [HostSidebarContainerComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(HostSidebarContainerComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should resolve sidebar and pusher references', () => {
    const containerDe = fixture.debugElement.query(By.directive(SuiSidebarContainerComponent));
    const container = containerDe.componentInstance as SuiSidebarContainerComponent;
    expect(container.suiSidebar).toBeTruthy();
    expect(container.suiPusher).toBeTruthy();
  });
});
