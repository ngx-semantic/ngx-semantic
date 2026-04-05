import {Component} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {SuiTabsModule} from './tabs.module';
import {SuiTabsComponent} from './tabs.component';

@Component({
  standalone: true,
  imports: [SuiTabsModule],
  template: `
    <sui-tabs (suiSelectedIndexChanged)="lastIndex = $event">
      <sui-tab suiTitle="First"><p class="pane-a">A</p></sui-tab>
      <sui-tab suiTitle="Second"><p class="pane-b">B</p></sui-tab>
    </sui-tabs>
  `
})
class HostTabsComponent {
  lastIndex = 0;
}

describe('SuiTabsComponent', () => {
  let fixture: ComponentFixture<HostTabsComponent>;
  let host: HostTabsComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostTabsComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(HostTabsComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render first tab content by default', () => {
    expect(fixture.debugElement.query(By.css('.pane-a'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('.pane-b'))).toBeFalsy();
  });

  it('should switch tabs when a menu item is clicked', () => {
    const tabsDe = fixture.debugElement.query(By.directive(SuiTabsComponent));
    const items = tabsDe.queryAll(By.css('[suiMenuItem]'));
    expect(items.length).toBe(2);
    items[1].triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(host.lastIndex).toBe(1);
    expect(fixture.debugElement.query(By.css('.pane-b'))).toBeTruthy();
  });
});
