import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TymxQuoteComponent } from './tymx-quote.component';

describe('TymxQuoteComponent', () => {
  let component: TymxQuoteComponent;
  let fixture: ComponentFixture<TymxQuoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TymxQuoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TymxQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
