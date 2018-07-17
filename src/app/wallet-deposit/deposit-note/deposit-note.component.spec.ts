import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositNoteComponent } from './deposit-note.component';

describe('DepositNoteComponent', () => {
  let component: DepositNoteComponent;
  let fixture: ComponentFixture<DepositNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepositNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
