import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuiButtonComponent } from './button.component';

describe('SuiButtonComponent', () => {
  let component: SuiButtonComponent;
  let fixture: ComponentFixture<SuiButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuiButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuiButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
