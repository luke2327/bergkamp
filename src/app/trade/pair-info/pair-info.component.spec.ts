import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PairInfoComponent } from './pair-info.component';

describe('PairInfoComponent', () => {
  let component: PairInfoComponent;
  let fixture: ComponentFixture<PairInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PairInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PairInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
