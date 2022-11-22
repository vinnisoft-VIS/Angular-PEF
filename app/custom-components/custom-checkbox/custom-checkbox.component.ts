import { Component, forwardRef, Output, EventEmitter } from "@angular/core";
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR
} from "@angular/forms";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-custom-checkbox",
  templateUrl: "./custom-checkbox.component.html",
  styleUrls: ["./custom-checkbox.component.scss"],

  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomCheckboxComponent),
      multi: true
    }
  ]
})
export class CustomCheckboxComponent implements ControlValueAccessor {
  onChange: any = () => {};
  onTouch: any = () => {};
  faTimes = faTimes;
  faCheck = faCheck;
  checked: boolean = false;

  @Output() onCheck = new EventEmitter();

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  constructor() {}

  writeValue(checked: boolean) {
    this.checked = checked;
  }

  onModelChange(e: any) {
    this.onCheck.emit(e);
  }
}
