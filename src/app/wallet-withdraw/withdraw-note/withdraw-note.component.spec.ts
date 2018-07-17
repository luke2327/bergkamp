import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawNoteComponent } from './withdraw-note.component';

describe('WithdrawNoteComponent', () => {
  let component: WithdrawNoteComponent;
  let fixture: ComponentFixture<WithdrawNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WithdrawNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WithdrawNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
