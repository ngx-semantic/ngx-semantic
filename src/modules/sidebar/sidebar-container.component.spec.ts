import {Component} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {SuiSidebarModule} from './sidebar.module';
import {SuiSidebarContainerComponent} from './sidebar-container.component';

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
class HostSidebarContainerComponent {
}

describe('SuiSidebarContainerComponent', () => {
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
});
