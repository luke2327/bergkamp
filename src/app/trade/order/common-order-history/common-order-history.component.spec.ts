import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonOrderHistoryComponent } from './common-order-history.component';

describe('CommonOrderHistoryComponent', () => {
  let component: CommonOrderHistoryComponent;
  let fixture: ComponentFixture<CommonOrderHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonOrderHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonOrderHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
