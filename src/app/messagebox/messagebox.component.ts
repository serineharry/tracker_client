import { OnInit, Component } from '@angular/core';
import { MessageboxService } from './messagebox.service';


// const KEY_ESC = 27;

@Component({
  selector: 'app-messagebox',
  templateUrl: './messagebox.component.html',
  styleUrls: ['./messagebox.component.css']
})

// Sample usage for invoking messagebox
// this.messageService.activate('Please use search criteria and select user')
//       .then(res => {
//         console.log(`Confirmed: ${res}`);
//       });

export class MessageboxComponent {

  showModal;

  private _defaults = {
    title: 'Confirmation',
    message: 'Do you want to cancel your changes?',
    cancelText: 'Cancel',
    okText: 'OK'
  };
  title: string;
  message: string;
  okText: string;
  cancelText: string;

  private negativeOnClick;
  private positiveOnClick;

  constructor(confirmService: MessageboxService) {
    confirmService.activate = this.activate.bind(this);
  }

  activate(message = this._defaults.message, title = this._defaults.title) {
    this._setLabels(message, title);

    let promise = new Promise<boolean>(resolve => {
      this._show(resolve);
    });
    return promise;
  }

  _setLabels(message = this._defaults.message, title = this._defaults.title) {
    this.title = title;
    this.message = message;
    this.okText = this._defaults.okText;
    this.cancelText = this._defaults.cancelText;
  }


  private _show(resolve: (boolean) => any) {
    // document.onkeyup = null;

    this.showModal = true;

    this.negativeOnClick = (e: any) => resolve(false);
    this.positiveOnClick = (e: any) => resolve(true);

    // if (!this._confirmElement || !this._cancelButton || !this._okButton) { return };
    // document.onkeyup = (e: any) => {
    //   if (e.which === KEY_ESC) {
    //     this._hideDialog();
    //     return negativeOnClick(null);
    //   }
    // };

  }

  emitOk(e: Event) {
    e.preventDefault();
    if (!this.positiveOnClick(e)) { this._hideDialog(); }
  }
  emitCancel(e: Event) {
    e.preventDefault();
    if (!this.negativeOnClick(e)) { this._hideDialog(); }
  }

  private _hideDialog() {
    this.showModal = false;
  }


}
