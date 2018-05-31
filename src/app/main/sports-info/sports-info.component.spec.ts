import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SportsInfoComponent } from './sports-info.component';

describe('SportsInfoComponent', () => {
  let component: SportsInfoComponent;
  let fixture: ComponentFixture<SportsInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SportsInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SportsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
