import {Component} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {SuiPopupModule} from './popup.module';

@Component({
  standalone: false,
  template: `
    <sui-popup [suiTitle]="'Hi'" [suiContent]="'Plain text'" [suiFluid]="true"></sui-popup>
  `
})
class HostPopupComponent {
}

describe('SuiPopupComponent', () => {
  let fixture: ComponentFixture<HostPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuiPopupModule],
      declarations: [HostPopupComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(HostPopupComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render title and string content', () => {
    const popup = fixture.debugElement.query(By.css('sui-popup .header'));
    const content = fixture.debugElement.query(By.css('sui-popup .content'));
    expect(popup.nativeElement.textContent).toContain('Hi');
    expect(content.nativeElement.textContent).toContain('Plain text');
  });

  it('should apply fluid class when suiFluid is true', () => {
    const root = fixture.debugElement.query(By.css('sui-popup div[style]')).nativeElement as HTMLElement;
    expect(root.className).toContain('fluid');
    expect(root.className).toContain('popup');
  });
});
