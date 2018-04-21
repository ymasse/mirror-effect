import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-delete-popup',
  templateUrl: './user-delete-popup.component.html'
})
export class UserDeletePopupComponent {
  @Input() name;

  @Input() fullname = { name: "" };

  constructor(public activeModal: NgbActiveModal) {}
}