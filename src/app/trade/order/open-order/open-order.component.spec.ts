import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenOrderComponent } from './open-order.component';

describe('OpenOrderComponent', () => {
  let component: OpenOrderComponent;
  let fixture: ComponentFixture<OpenOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
