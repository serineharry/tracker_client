import { Component, Input, Output, EventEmitter } from '@angular/core';
import { GlobalService } from '../global.service';


@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  exportAs: 'iptModel'
})

export class InputComponent {


  // The internal data model
  // private innerValue: any;
  userDateFormat = this.globalSvc.getDateFormat();

  @Input()
  form;

  @Input()
  name;

  @Input()
  type = 'text';

  @Input()
  iptModel: any;

  @Input()
  iptClass;

  @Input()
  iptRequired;

  @Input()
  iptDisabled = false;

  @Input()
  placeholder;

  @Input()
  min;

  @Input()
  max;

  @Input()
  autofocus;

  @Input()
  autocomplete;


  @Output()
  iptModelChange: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  change: EventEmitter<any> = new EventEmitter<any>();

  private dirty = false;



  constructor(private globalSvc: GlobalService) { }

  parseForCheckbox(event: Event, v: any) {
    // console.log('input', typeof (this.innerValue), 'value', v);
    if (this.type === 'checkbox') {
      // if (typeof (this.innerValue) === 'boolean') {
      //   v = v;
      // } else if (typeof (this.value) === 'boolean') {
      //   v = v;
      // }
      v = +v;
    }
    this.iptModel = v;

    this.emitChange(event);
  }

  emitChange(event: Event) {

    console.log('emit change');

    event.stopPropagation();
    this.dirty = true;
    this.iptModelChange.emit(this.iptModel);
    this.change.emit(event);
  }

}

