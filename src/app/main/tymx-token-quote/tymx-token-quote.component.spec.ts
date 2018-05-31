import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TymxTokenQuoteComponent } from './tymx-token-quote.component';

describe('TymxTokenQuoteComponent', () => {
  let component: TymxTokenQuoteComponent;
  let fixture: ComponentFixture<TymxTokenQuoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TymxTokenQuoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TymxTokenQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
