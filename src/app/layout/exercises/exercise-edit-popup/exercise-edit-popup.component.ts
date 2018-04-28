import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {TranslateService} from '@ngx-translate/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

import { Exercise } from '../exercise.model';

@Component({
  selector: 'app-exercise-edit-popup',
  templateUrl: './exercise-edit-popup.component.html',
  styleUrls: [ './exercise-edit-popup.component.scss' ],
})
export class ExerciseEditPopupComponent implements OnInit {
  @Input() username;
  @Input() exercise: Exercise = null;
  @Input() editMode: boolean = false;

  //exercise: Exercise = null;
  exerciseForm: FormGroup;
  addEditButtonLabel: string = "Add";

  languages=  [
    { code:'fr', displayName:'French'},
    { code:'en', displayName:'English'}
  ];

  
  constructor(public activeModal: NgbActiveModal,
     private fb: FormBuilder,
     private translateService: TranslateService) {}

  ngOnInit() {
    let description = "";
    let language = this.languages[0];

    if (this.editMode) {
      
      this.translateService.get('Save').subscribe((res: string) => this.addEditButtonLabel = res);
      description = this.exercise.description;
      language = this.languages.find(x => x.code == this.exercise.language);
      
      
      this.exerciseForm = this.fb.group({
        description: ['', Validators.required],
        language: ['', Validators.required]
      });    
      (<FormGroup>this.exerciseForm)
                  .setValue({description: description, language: language}, {onlySelf: true});

    } else {
      this.translateService.get('Add').subscribe((res: string) => this.addEditButtonLabel = res);
      this.exerciseForm = this.fb.group({
        description: [description, Validators.required],
        language: [language, Validators.required]
      });    
      
    }
  }

  onSubmit() {
    let exercise = new Exercise();
    exercise.description = this.exerciseForm.value.description;
    exercise.language = this.exerciseForm.value.language.code;

    if (this.editMode) {
      exercise._id = this.exercise._id;
    }
    
    // TODO: Get user name from token.
    exercise.username = this.username;

    let result = {
      cancel: false,
      exercise : exercise
    }
    this.activeModal.close(result)
  }

  onCancel() {
    let result = {
      cancel: true,
      exercise : null
    }
    this.activeModal.close(result)
  }

}