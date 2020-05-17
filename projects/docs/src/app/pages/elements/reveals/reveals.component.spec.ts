import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevealsComponent } from './reveals.component';

describe('RevealsComponent', () => {
  let component: RevealsComponent;
  let fixture: ComponentFixture<RevealsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevealsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
