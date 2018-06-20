import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderNotiComponent } from './header-noti.component';

describe('HeaderNotiComponent', () => {
  let component: HeaderNotiComponent;
  let fixture: ComponentFixture<HeaderNotiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderNotiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderNotiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
