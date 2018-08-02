import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelGAuthComponent } from './cancel-g-auth.component';

describe('CancelGAuthComponent', () => {
  let component: CancelGAuthComponent;
  let fixture: ComponentFixture<CancelGAuthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancelGAuthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelGAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
