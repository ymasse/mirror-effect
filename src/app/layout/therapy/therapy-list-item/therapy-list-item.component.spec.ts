import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TherapyListItemComponent } from './therapy-list-item.component';

describe('TherapyListItemComponent', () => {
  let component: TherapyListItemComponent;
  let fixture: ComponentFixture<TherapyListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TherapyListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TherapyListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
