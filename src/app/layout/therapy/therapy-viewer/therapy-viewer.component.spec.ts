import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TherapyViewerComponent } from './therapy-viewer.component';

describe('TherapyViewerComponent', () => {
  let component: TherapyViewerComponent;
  let fixture: ComponentFixture<TherapyViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TherapyViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TherapyViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
