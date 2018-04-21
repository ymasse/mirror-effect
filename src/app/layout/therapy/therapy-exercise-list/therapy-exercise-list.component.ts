import { Component, OnInit, Input } from '@angular/core';
import { AvailableExercise } from '../available-exercise.model';

@Component({
  selector: 'app-therapy-exercise-list',
  templateUrl: './therapy-exercise-list.component.html',
  styleUrls: ['./therapy-exercise-list.component.scss']
})
export class TherapyExerciseListComponent implements OnInit {

  @Input()  exercises: AvailableExercise[] ;
  selected = [];
  
  constructor() { }

  ngOnInit() {
  }

  onSelect({ selected }) {
    console.log('Select Event', selected, this.selected);

    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }  

}
