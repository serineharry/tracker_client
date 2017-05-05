import { Component, Input, Output, EventEmitter } from '@angular/core';
// import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';
// import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { GlobalService } from '../global.service';


const noop = () => {
};

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.css'],
  // providers: [
  //   {
  //     provide: NG_VALUE_ACCESSOR,
  //     useExisting: forwardRef(() => TextareaComponent),
  //     multi: true
  //   },
  // ],
})
// export class TextareaComponent implements ControlValueAccessor {
export class TextareaComponent {

  // The internal data model
  // private innerValue: any = '';

  @Input()
  form;

  @Input()
  name;

  @Input()
  txtModel: any;

  @Output()
  txtModelChange: EventEmitter<any> = new EventEmitter<any>();

  @Input()
  txtClass;

  @Input()
  txtRequired;

  @Input()
  txtDisabled = false;

  @Input()
  placeholder;

  // Placeholders for the callbacks which are later providesd
  // by the Control Value Accessor
  // private onTouchedCallback: () => void = noop;
  // private onChangeCallback: (_: any) => void = noop;

  // // get accessor
  // @Input()
  // get value(): any {
  //   return this.innerValue;
  // };

  // // set accessor including call the onchange callback
  // set value(v: any) {
  //   console.log('set value', v);
  //   // console.log('textarea', 'set value for', this.type, v);
  //   if (v !== this.innerValue) {
  //     this.innerValue = v;
  //     this.onChangeCallback(v);
  //   }
  // }
  userDateFormat = this.globalSvc.getDateFormat();

  constructor(private globalSvc: GlobalService) { }
  // // Set touched on blur
  // onBlur() {
  //   this.onTouchedCallback();
  // }

  // // From ControlValueAccessor interface
  // writeValue(value: any) {
  //   console.log('input', 'writeValue txtArea', this.name, 'inner value', this.innerValue, 'value', value);
  //   // if (value !== this.innerValue) {
  //   if (value !== undefined) {
  //     this.value = value;
  //     this.innerValue = value;
  //   }
  // }


  // // From ControlValueAccessor interface
  // registerOnChange(fn: any) {
  //   this.onChangeCallback = fn;
  // }

  // // From ControlValueAccessor interface
  // registerOnTouched(fn: any) {
  //   this.onTouchedCallback = fn;
  // }

  emitChanges(event: Event) {
    event.stopPropagation();
    this.txtModelChange.emit(this.txtModel);
  }

}

