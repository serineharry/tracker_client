import { Component, OnInit, Input, OnChanges, SimpleChange, Output, EventEmitter } from '@angular/core';
import { animationFade } from '../model/animation-fade';

@Component({
  selector: 'app-tracker-alert',
  templateUrl: './tracker-alert.component.html',
  styleUrls: ['./tracker-alert.component.css'],
  animations: [animationFade]
})
export class TrackerAlertComponent implements OnInit {

  alertMsg;

  @Input()
  alertClass = 'alert-danger';

  @Input()
  get alertMessage() {
    return this.alertMsg;

  }
  set alertMessage(val) {
    if (val !== this.alertMsg) {
      console.log('not equal', val);
      this.alertMsg = val;
      if (val) {
        this.cleanUpAfterTimeOut();
      }
    }
  }

  @Output() alertMessageChange: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }


  cleanUpAfterTimeOut() {

    console.log('tracker-alert', 'Invoking cleanUpAfterTimeOut');
    setTimeout(function () {
      this.alertMsg = null;
      this.emitModelChange();
    }.bind(this), 3000);
  }

  emitModelChange() {
    console.log('tracker-alert', 'emitModelChange');
    this.alertMessageChange.emit(this.alertMsg);
  }




}
