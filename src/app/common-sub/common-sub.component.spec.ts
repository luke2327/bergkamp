import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonSubComponent } from './common-sub.component';

describe('CommonSubComponent', () => {
  let component: CommonSubComponent;
  let fixture: ComponentFixture<CommonSubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonSubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonSubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
