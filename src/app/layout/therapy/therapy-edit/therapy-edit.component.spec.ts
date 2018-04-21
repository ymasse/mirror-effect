import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TherapyEditComponent } from './therapy-edit.component';

describe('TherapyEditComponent', () => {
  let component: TherapyEditComponent;
  let fixture: ComponentFixture<TherapyEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TherapyEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TherapyEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
