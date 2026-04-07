import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SuiSidebarModule } from './sidebar.module';
import { SuiSidebarContainerComponent } from './sidebar-container.component';
import { SuiSidebarComponent } from './sidebar.component';
import { SuiSidebarPusherComponent } from './sidebar-pusher.component';

@Component({
  standalone: true,
  imports: [SuiSidebarModule],
  template: `
    <sui-sidebar-container>
      <sui-sidebar [visible]="true">Nav</sui-sidebar>
      <sui-sidebar-pusher>Main</sui-sidebar-pusher>
    </sui-sidebar-container>
  `
})
class HostSidebarContainerComponent {}

@Component({
  standalone: true,
  imports: [SuiSidebarModule],
  template: `
    <sui-sidebar-container>
      <sui-sidebar-pusher>Main only</sui-sidebar-pusher>
    </sui-sidebar-container>
  `
})
class MissingSidebarHost {}

@Component({
  standalone: true,
  imports: [SuiSidebarModule],
  template: `
    <sui-sidebar-container>
      <sui-sidebar>Nav only</sui-sidebar>
    </sui-sidebar-container>
  `
})
class MissingPusherHost {}

describe('SuiSidebarContainerComponent', () => {
  afterEach(() => {
    TestBed.resetTestingModule();
  });

  describe('valid layout', () => {
    let fixture: ComponentFixture<HostSidebarContainerComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [HostSidebarContainerComponent]
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

    it('should update pusher when sidebar emits visibleChange', () => {
      const sidebar = fixture.debugElement.query(By.directive(SuiSidebarComponent))
        .componentInstance as SuiSidebarComponent;
      const pusher = fixture.debugElement.query(By.directive(SuiSidebarPusherComponent))
        .componentInstance as SuiSidebarPusherComponent;

      sidebar.visibleChange.emit(true);
      expect(pusher.isSidebarOpen).toBe(true);

      sidebar.visibleChange.emit(false);
      expect(pusher.isSidebarOpen).toBe(false);
    });
  });

  it('should throw when sidebar is missing', async () => {
    await TestBed.configureTestingModule({
      imports: [MissingSidebarHost]
    }).compileComponents();

    expect(() => {
      const f = TestBed.createComponent(MissingSidebarHost);
      f.detectChanges();
    }).toThrowError(/sidebar/);
  });

  it('should throw when pusher is missing', async () => {
    await TestBed.configureTestingModule({
      imports: [MissingPusherHost]
    }).compileComponents();

    expect(() => {
      const f = TestBed.createComponent(MissingPusherHost);
      f.detectChanges();
    }).toThrowError(/pusher/);
  });
});
