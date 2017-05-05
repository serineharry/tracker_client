import { Component, Input, Output, EventEmitter } from '@angular/core';
import { GlobalService } from '../global.service';


@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
})
export class SelectComponent {

  // The internal data model
  private innerValue: any = '';

  @Input()
  form;

  @Input()
  name;

  @Input()
  selModel: any;

  @Output()
  selModelChange: EventEmitter<any> = new EventEmitter<any>();

  @Input()
  selClass;

  @Input()
  selStyle;

  @Input()
  selRequired;

  @Input()
  selMultiple;

  @Input()
  selDisabled = false;

  @Input()
  placeholder;


  constructor() { }

  emitChange(event: Event) {
    event.stopPropagation();
    this.selModelChange.emit(this.selModel);
  }

}

