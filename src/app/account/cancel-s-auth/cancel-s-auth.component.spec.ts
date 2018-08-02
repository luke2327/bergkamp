import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelSAuthComponent } from './cancel-s-auth.component';

describe('CancelSAuthComponent', () => {
  let component: CancelSAuthComponent;
  let fixture: ComponentFixture<CancelSAuthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancelSAuthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelSAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
