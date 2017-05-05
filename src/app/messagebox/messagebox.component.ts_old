import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { MessageModel } from './message-model';

@Component({
  selector: 'app-messagebox',
  templateUrl: './messagebox.component.html',
  styleUrls: ['./messagebox.component.css'],
})
export class MessageboxComponent implements OnInit {

  showModal = false;
  messageModel: MessageModel;

  @Input()
  get msgModel() {
    console.log('get');
    return this.messageModel;

  }
  set msgModel(val) {
    console.log('sett');

    if (val !== this.messageModel) {

      console.log('not equal', val);
      this.messageModel = val;

      if (val) {
        this.show();
      }
    }
  }

  // @Output()
  // messageModalChange: EventEmitter<string> = new EventEmitter<string>();

  @Output('msgClick')
  msgClick: EventEmitter<any> = new EventEmitter();

  constructor() {
  }


  ngOnInit() {
    this.show();
  }

  /**
   * Shows the modal. There is no method for hiding. This is done using actions of the modal itself.
   */
  show() {
    if (this.messageModel.message) {
      this.showModal = true;
    }

  }

  emitCloseEvent(event: Event, buttonClicked: string) {

    event.stopPropagation();
    this.showModal = false;
    this.msgClick.emit({ 'event': event, 'buttonClicked': buttonClicked, 'messageModel': this.messageModel });

  }

}
