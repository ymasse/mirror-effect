import { Component, Input, Output, OnInit, OnDestroy, ChangeDetectionStrategy, EventEmitter } from '@angular/core';

import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { User} from './../user.model';
import { NewUser } from '../new-user.model';

import * as fromUsers from '../store/user.reducers';
import * as UserActions from '../store/user.actions';
import * as fromApp from '../../../store/app.reducers';


//import { ICustomer } from '../shared/interfaces';
//import { TrackByService } from '../core/services/trackby.service';

@Component({ 
  selector: 'app-user-edit', 
  templateUrl: './user-edit.component.html',
  styleUrls: [ './user-edit.component.scss' ],
  //When using OnPush detectors, then the framework will check an OnPush 
  //component when any of its input properties changes, when it fires 
  //an event, or when an observable fires an event ~ Victor Savkin (Angular Team)
  //changeDetection: ChangeDetectionStrategy.OnPush 
})
export class UserEditComponent implements OnInit, OnDestroy {
  id: number;
  editMode = false;
  userForm: FormGroup;
  readonly CREATE_LABEL: string = 'Create' ;
  readonly UPDATE_LABEL:string  = 'Update';
  submitButtonLabel:string = this.CREATE_LABEL;
  editUser: string;
  userAddFailure: boolean = false;

  languages=  [
    { code:'fr', displayName:'French'},
    { code:'en', displayName:'English'}
  ];

  roles: string[] = ['patient', 'therapist', 'admin'];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder,
              private store: Store<fromUsers.FeatureState>
            ) { }
       
  
  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
        }
      );
  }

  ngOnDestroy() {
    this.store.dispatch(new UserActions.AddUserCancel(null));
  }

  private initForm() {
    let username = '';
    let first_name = '';
    let last_name = '';
    let password = '';
    let validatePassword = '';
    let email = ''
    let role = this.roles[0];
    let isAdmin = false;
    let language = this.languages[0];

    if (this.editMode) {
      this.submitButtonLabel = this.UPDATE_LABEL;
       this.store.select('users')
         .take(1)
         .subscribe((userState: fromUsers.State) => {
           const user = userState.users[this.id];
           this.editUser = user.username;
           username = user.username;
           first_name = user.first_name;
           last_name = user.last_name;
           email = user.email;
           isAdmin = user.isAdmin;
           role = user.role;
           language = this.languages.find(x => x.code == user.language);
         });
    } else {
      this.store.select('users').subscribe((userState: fromUsers.State) => {
        this.userAddFailure = userState.addFailure;
      });
    }

    this.userForm = this.fb.group({
      username: [{value: username, disabled:this.editMode}, Validators.required],
      password: [{value: username, disabled:this.editMode}, Validators.required],
      validatePassword: [{value: username, disabled:this.editMode}, [Validators.required, ValidatePassword]],
      first_name: [first_name, Validators.required],
      last_name: [last_name, Validators.required],
      email: [email, [Validators.required, Validators.email]],
      role: [role, Validators.required],
      isAdmin: [isAdmin],
      language: [language, Validators.required]
    });

    // if (this.editMode) {
    //   this.userForm.exclude()
    // }
  }

  onSubmit() {

    if (this.editMode) {
      this.store.dispatch(new UserActions.TryUpdateUser(
        {
          username: this.editUser, 
          updatedUser: new User(
          this.editUser,
          this.userForm.value.first_name,
          this.userForm.value.last_name,
          this.userForm.value.email,
          this.userForm.value.role,
          this.userForm.value.isAdmin,
          this.userForm.value.language.code)
      }));
    }
    else
    {
      this.store.dispatch(new UserActions.StoreNewUser(new NewUser(
        this.userForm.value.username,
        this.userForm.value.password,
        this.userForm.value.first_name,
        this.userForm.value.last_name,
        this.userForm.value.email,
        this.userForm.value.role,
        this.userForm.value.isAdmin,
        this.userForm.value.language.code)
      )); 
    }
  }

  onCancel() {
    this.router.navigate(['/users']);
  }

  isEditMode() {
    return this.isEditMode;
  }

  showPasswordMatchError() {
    return !this.userForm.controls.validatePassword.pristine && this.userForm.controls.validatePassword.errors;
  }
}

// export function passwordValidation(g: FormGroup) {
// //   return (control: AbstractControl): {[key: string]: any} => {
// //     //const forbidden = nameRe.test(control.value);
// //     //return forbidden ? {'forbiddenName': {value: control.value}} : null;
// //     return  {'passwordValidation': {value: control.value}}
// //   };
//   console.log("password validation in progress.");
//   return g.get('password').value === g.get('validatePassword').value
//         ? null : {'mismatch': true};
// }


export function ValidatePassword(control: AbstractControl) {
  const parentForm = control.parent;
  if (parentForm != undefined ) {    
    const password = parentForm.get('password');
    if (control.value !== password.value) {
        return { passwordMatch: false };
    }
  }
  return null;
}