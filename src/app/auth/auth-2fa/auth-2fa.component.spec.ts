import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Auth2faComponent } from './auth-2fa.component';

describe('Auth2faComponent', () => {
  let component: Auth2faComponent;
  let fixture: ComponentFixture<Auth2faComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Auth2faComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Auth2faComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
