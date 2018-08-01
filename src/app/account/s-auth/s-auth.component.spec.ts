import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SAuthComponent } from './s-auth.component';

describe('SAuthComponent', () => {
  let component: SAuthComponent;
  let fixture: ComponentFixture<SAuthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SAuthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
