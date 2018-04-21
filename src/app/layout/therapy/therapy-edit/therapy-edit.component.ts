import { Component, Input, Output, OnInit, OnDestroy, ChangeDetectionStrategy, EventEmitter } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';

import { User} from '../../users/user.model';
import { Therapy } from '../therapy.model';
import { TherapyActor } from '../therapy-actor.model';
import { NewTherapy } from '../new-therapy.model';

import * as fromTherapies from '../store/therapy.reducers';
import * as TherapyActions from '../store/therapy.actions';
import * as fromApp from '../../../store/app.reducers';
import * as fromUsers from '../../users/store/user.reducers';
import { ValidatePassword } from '../../users/user-edit/user-edit.component';
import { AvailableExercise } from '../available-exercise.model';
import {  TherapyExerciseListComponent } from '../therapy-exercise-list/therapy-exercise-list.component';

@Component({
  selector: 'app-therapy-edit',
  templateUrl: './therapy-edit.component.html',
  styleUrls: ['./therapy-edit.component.scss']
})
export class TherapyEditComponent implements OnInit {
  id: number;
  editMode = false;
  readonly CREATE_LABEL: string = 'Create' ;
  readonly UPDATE_LABEL:string  = 'Update';
  submitButtonLabel:string = this.CREATE_LABEL;
  therapyForm: FormGroup;
  therapists: {_id: string, language: string, fullName: string }[] = [];
  patients: {_id: string, language: string, fullName: string }[] = [];
  therapistList: Observable<{therapists: {_id: string, language: string, fullName: string }[]}>
  patientList: Observable<{patients: {_id: string, language: string, fullName: string }[]}>
  availableExercise: AvailableExercise[];
  therapyState: Observable<fromTherapies.State>;

  languages=  [
    { code:'fr', displayName:'French'},
    { code:'en', displayName:'English'}
  ];

  faceSides=  [
    { code:'right', displayName:'Right'},
    { code:'left', displayName:'Left'}
  ];

  @ViewChild(TherapyExerciseListComponent)
  private exerciseList: TherapyExerciseListComponent

  constructor(private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private store: Store<fromApp.AppState>) { }

  ngOnInit() {


    this.therapistList = this.store.select('users').map((state) => {
      let newTherapist: {_id: string, language: string, fullName: string }[] = [];
      state.users.forEach(user => {
        if (user.role == "therapist") {
          newTherapist.push({_id: user._id, language: user.language, fullName: user.first_name + " " + user.last_name});
        }
      });
      return {therapists: newTherapist };
    });

    this.patientList = this.store.select('users').map((state) => {
      let newPatients: {_id: string, language: string, fullName: string }[] = [];
      state.users.forEach(user => {
        if (user.role == "patient") {
          newPatients.push({_id: user._id, language: user.language, fullName: user.first_name + " " + user.last_name});
        }
      });
      return {patients: newPatients };
    });

    this.therapyState = this.store.select('therapies');
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
      }
    );
    this.initForm();
  
  }

  private initForm() {
    let patient = '';
    let therapist = '';
    let language = this.languages[0];
    let paralyzedSide = null;
    let notes = '';
    let published = false;    
    let movementRepetition = 5;
    let delayBetweenMovementRepetition = 5;
    let movementDuration = 3;
    let dailyFrequency = 3;
    let startDate = new Date();

    if (this.editMode) {
      this.submitButtonLabel = this.UPDATE_LABEL;
       this.store.select('therapies')
         .take(1)
         .subscribe((therapyState: fromTherapies.State) => {
           const therapy = therapyState.therapies[this.id];
           let patients = null;
           this.patientList.take(1).subscribe(x => patients = x.patients);
           // TODO (yanmas1): Handle the case where the patient is no more a patient.
           patient = patients.find(x => x._id == therapy.patient._id);
           
           let therapists = null;
           this.therapistList.take(1).subscribe(x => therapists = x.therapists);
           // TODO (yanmas1): Handle the case where the therapist is no more in the DB.
           therapist = therapists.find(x => x._id == therapy.therapist._id);

           language = this.languages.find(x => x.code == therapy.language);
           paralyzedSide = this.faceSides.find(x => x.code == therapy.paralyzedSide.toString());
           notes = therapy.notes;
           movementRepetition = therapy.numberOfRepetition;
           delayBetweenMovementRepetition = therapy.delayBetweenExercise;
           movementDuration = therapy.singleExerciseDuration;
           dailyFrequency = therapy.dailyFrequency;
           startDate = therapy.startDate;
         });
    } else {
      // this.store.select('users').subscribe((userState: fromUsers.State) => {
      //   this.userAddFailure = userState.addFailure;
      // });
    }

    this.therapyForm = this.fb.group({
      patient: [patient, Validators.required],
      therapist: [therapist, Validators.required],
      language: [language, Validators.required],
      paralyzedSide: [paralyzedSide, Validators.required],
      notes: [notes],
      movementRepetition: [movementRepetition, Validators.required],
      delayBetweenMovementRepetition: [delayBetweenMovementRepetition, Validators.required],
      movementDuration: [movementDuration, Validators.required],
      dailyFrequency: [dailyFrequency, Validators.required],
      startDate: [startDate, Validators.required]
    });

    if (this.editMode) {
      this.therapyForm.controls['patient'].setValue(patient, {onlySelf: true}) ;
      this.therapyForm.controls['therapist'].setValue(therapist, {onlySelf: true}) ;
    }


    // if (this.editMode) {
    //   this.userForm.exclude()
    // }
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onSubmit() {
    if (this.editMode) {
      // this.store.dispatch(new UserActions.TryUpdateUser(
      //   {
      //     username: this.editUser, 
      //     updatedUser: new User(
      //     this.editUser,
      //     this.userForm.value.first_name,
      //     this.userForm.value.last_name,
      //     this.userForm.value.email,
      //     this.userForm.value.role,
      //     this.userForm.value.isAdmin,
      //     this.userForm.value.language.code)
      // }));
    }
    else
    {
      let newTherapy: NewTherapy = new NewTherapy();

      let exerciseList = this.exerciseList.selected;
      newTherapy.completed = false;      
      newTherapy.dailyFrequency = this.therapyForm.value.dailyFrequency;
      newTherapy.delayBetweenExercise = this.therapyForm.value.delayBetweenMovementRepetition;
      newTherapy.numberOfRepetition = this.therapyForm.value.movementRepetition;
      newTherapy.singleExerciseDuration = this.therapyForm.value.movementDuration;
      newTherapy.paralyzedSide = this.therapyForm.value.paralyzedSide.code;
      newTherapy.therapist = this.therapyForm.value.therapist._id;
      newTherapy.patient = this.therapyForm.value.patient._id;
      newTherapy.startDate = this.therapyForm.value.startDate;
      newTherapy.endDate = this.therapyForm.value.startDate;
      newTherapy.published = true;
      newTherapy.notes = this.therapyForm.value.notes;
      newTherapy.language = this.therapyForm.value.language.code;

      let selectedExercises: string[] = [];
      for (let e of this.exerciseList.selected) {
        selectedExercises.push(e._id);
      }
      newTherapy.exercises = selectedExercises;
      
      


      
      //newTherapy.exercises = 
      //newTherapy.mainTherapist
      //newTherapy.createdBy = 
      //newTherapy.patient = 

      this.store.dispatch(new TherapyActions.TryAddTherapy(newTherapy))

      // this.store.dispatch(new UserActions.StoreNewUser(new NewUser(
      //   this.userForm.value.username,
      //   this.userForm.value.password,
      //   this.userForm.value.first_name,
      //   this.userForm.value.last_name,
      //   this.userForm.value.email,
      //   this.userForm.value.role,
      //   this.userForm.value.isAdmin,
      //   this.userForm.value.language.code)
      // )); 
    }
  }

}
