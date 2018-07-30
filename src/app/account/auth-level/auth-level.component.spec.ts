import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthLevelComponent } from './auth-level.component';

describe('AuthLevelComponent', () => {
  let component: AuthLevelComponent;
  let fixture: ComponentFixture<AuthLevelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthLevelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
