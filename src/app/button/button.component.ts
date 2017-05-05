import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {

  @Input()
  name;

  @Input()
  type = 'button';

  @Input()
  btnClass = 'btn btn-primary';

  @Input()
  btnInProgress = false;

  @Input()
  btnFaIcon = '';

  @Input()
  ngClass = '';

  @Input()
  btnDisabled = '';

  @Output()
  btnClick: EventEmitter<any> = new EventEmitter();


  constructor() { }

  ngOnInit() {
  }


  emitButtonClickEvent(event: Event) {

    event.stopPropagation();

    if (!this.btnDisabled) {
      if (!this.btnInProgress) {
        this.btnClick.emit(event);
      }
    } else {
      console.log('don\'t try to poke me hacker, am disabled');
    }

  }

}
