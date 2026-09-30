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

@Component({
  standalone: true,
  imports: [SuiSidebarModule],
  template: `
    <sui-sidebar-container [suiPushable]="true">
      <sui-sidebar [visible]="false">Nav</sui-sidebar>
      <sui-sidebar-pusher>Main</sui-sidebar-pusher>
    </sui-sidebar-container>
    <sui-sidebar-container>
      <sui-sidebar [(visible)]="second">Nav</sui-sidebar>
      <sui-sidebar-pusher [suiDimmable]="true">Main</sui-sidebar-pusher>
    </sui-sidebar-container>
  `
})
class PushableHost {
  second = false;
}

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

      sidebar.visible = false;
      expect(pusher.isSidebarOpen).toBe(false);

      sidebar.visible = true;
      expect(pusher.isSidebarOpen).toBe(true);
    });

    it('should sync the pusher with the initial sidebar visibility', () => {
      const pusher = fixture.debugElement.query(By.directive(SuiSidebarPusherComponent))
        .componentInstance as SuiSidebarPusherComponent;
      expect(pusher.isSidebarOpen).toBe(true);
    });

    it('should not be pushable by default', () => {
      const containerEl = fixture.debugElement.query(By.directive(SuiSidebarContainerComponent)).nativeElement;
      expect(containerEl.classList).not.toContain('pushable');
    });
  });

  describe('pushable and scoped layout', () => {
    let fixture: ComponentFixture<PushableHost>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [PushableHost]
      }).compileComponents();

      fixture = TestBed.createComponent(PushableHost);
      fixture.detectChanges();
    });

    it('should apply the pushable class', () => {
      const containers = fixture.debugElement.queryAll(By.directive(SuiSidebarContainerComponent));
      expect(containers[0].nativeElement.classList).toContain('pushable');
      // dimmable pushers require a pushable context
      expect(containers[1].nativeElement.classList).toContain('pushable');
    });

    it('should keep each container independent', () => {
      const pushers = fixture.debugElement.queryAll(By.directive(SuiSidebarPusherComponent))
        .map(d => d.componentInstance as SuiSidebarPusherComponent);
      const sidebars = fixture.debugElement.queryAll(By.directive(SuiSidebarComponent))
        .map(d => d.componentInstance as SuiSidebarComponent);

      sidebars[0].visible = true;
      expect(pushers[0].isSidebarOpen).toBe(true);
      expect(pushers[1].isSidebarOpen).toBe(false);
    });

    it('should close a bound sidebar when the pusher is clicked', () => {
      const host = fixture.componentInstance;
      host.second = true;
      fixture.detectChanges();

      const pusherEl = fixture.debugElement.queryAll(By.directive(SuiSidebarPusherComponent))[1].nativeElement;
      pusherEl.click();
      fixture.detectChanges();
      expect(host.second).toBe(false);
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
