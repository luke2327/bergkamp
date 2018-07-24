import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotiSettingComponent } from './noti-setting.component';

describe('NotiSettingComponent', () => {
  let component: NotiSettingComponent;
  let fixture: ComponentFixture<NotiSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotiSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotiSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
