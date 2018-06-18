import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BidAskTableComponent } from './bid-ask-table.component';

describe('BidAskTableComponent', () => {
  let component: BidAskTableComponent;
  let fixture: ComponentFixture<BidAskTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BidAskTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BidAskTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
