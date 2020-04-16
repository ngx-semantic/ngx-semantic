import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxSemanticComponent } from './ngx-semantic.component';

describe('NgxSemanticComponent', () => {
  let component: NgxSemanticComponent;
  let fixture: ComponentFixture<NgxSemanticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxSemanticComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxSemanticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
