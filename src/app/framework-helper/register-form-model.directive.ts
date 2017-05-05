import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { NgModel, NgForm } from '@angular/forms';

@Directive({
  selector: '[appRegisterForm]'
})
export class RegisterFormModelDirective implements OnInit {
  private el: HTMLInputElement;

  @Input()
  appRegisterForm: NgForm;
  @Input()
  appRegisterModel: NgModel;

  constructor(el: ElementRef) {
    this.el = el.nativeElement;
  }

  ngOnInit() {
    if (this.appRegisterForm && this.appRegisterModel) {
      console.log('inside directive if condition');
      this.appRegisterForm.form.removeControl(this.appRegisterModel.name);
      // this.appRegisterForm.form.registerControl(this.appRegisterModel.name, this.appRegisterModel.control);
      this.appRegisterForm.addControl(this.appRegisterModel);
    }
  }
}
