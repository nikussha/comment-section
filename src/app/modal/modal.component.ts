import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { log } from 'console';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Output() deleteuserEvent = new EventEmitter();
  @Output() canceluserEvent = new EventEmitter();
  constructor(private el: ElementRef) {}

  ngOnInit(): void {}

  deleteuser() {
    this.deleteuserEvent.emit();
  }

  cancelevent() {
    this.canceluserEvent.emit();
  }
}
