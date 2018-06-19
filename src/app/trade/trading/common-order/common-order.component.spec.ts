import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonOrderComponent } from './common-order.component';

describe('CommonOrderComponent', () => {
  let component: CommonOrderComponent;
  let fixture: ComponentFixture<CommonOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
