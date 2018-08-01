import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelCommonAuthComponent } from './cancel-common-auth.component';

describe('CancelCommonAuthComponent', () => {
  let component: CancelCommonAuthComponent;
  let fixture: ComponentFixture<CancelCommonAuthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancelCommonAuthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelCommonAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
