import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LangPopoverComponent } from './lang-popover.component';

describe('LangPopoverComponent', () => {
  let component: LangPopoverComponent;
  let fixture: ComponentFixture<LangPopoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LangPopoverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LangPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
