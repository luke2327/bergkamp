import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainNoticeComponent } from './main-notice.component';

describe('MainNoticeComponent', () => {
  let component: MainNoticeComponent;
  let fixture: ComponentFixture<MainNoticeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainNoticeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
