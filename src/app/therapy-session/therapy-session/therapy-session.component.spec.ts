import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TherapySessionComponent } from './therapy-session.component';

describe('TherapySessionComponent', () => {
  let component: TherapySessionComponent;
  let fixture: ComponentFixture<TherapySessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TherapySessionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TherapySessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
