import { Component, Input } from '@angular/core';
import { MzBaseModal, MzModalComponent } from 'ng2-materialize';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent extends MzBaseModal {

  constructor() { super(); }

  @Input() title: string
  @Input() message: string

  onClickClose () {
      // Redirect to homepage
      window.location.href = "/"
  }

}
