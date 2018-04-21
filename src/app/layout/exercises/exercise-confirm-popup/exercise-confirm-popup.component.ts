import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router/src/router_state';

@Component({
  selector: 'app-exercise-confirm-popup',
  templateUrl: './exercise-confirm-popup.component.html'
})
export class ExerciseConfirmPopupComponent {

  constructor(public activeModal: NgbActiveModal) {}

  onYes() {
    this.activeModal.close(true);
  }

  onNo() {
    this.activeModal.close(false);
  }
}