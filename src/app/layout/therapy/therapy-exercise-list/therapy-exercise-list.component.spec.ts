  import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TherapyExerciseListComponent } from './therapy-exercise-list.component';

describe('TherapyExerciseListComponent', () => {
  let component: TherapyExerciseListComponent;
  let fixture: ComponentFixture<TherapyExerciseListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TherapyExerciseListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TherapyExerciseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
