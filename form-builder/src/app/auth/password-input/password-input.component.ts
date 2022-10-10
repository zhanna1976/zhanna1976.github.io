import { Component, Input, Optional, Self, ViewChild } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormGroupDirective,
  NgControl,
  NgForm,
  Validators,
} from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-password-input',
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.scss'],
})
export class PasswordInputComponent
  implements ControlValueAccessor, ErrorStateMatcher
{
  disabled = false;

  icon = 'visibility_off';

  @Input()
  label!: string;

  @Input()
  customErrorMessage!: string;

  @Input()
  customErrorName!: string;

  get matcher() {
    return this;
  }

  @ViewChild(MatInput)
  matInput!: MatInput;

  get required(): boolean {
    return (
      this._required ??
      this.ngControl?.control?.hasValidator(Validators.required) ??
      false
    );
  }

  @Input()
  set required(value: boolean) {
    this._required = value;
  }

  touched = false;

  type = 'password';

  value!: string;

  private _required!: boolean;

  private _visible = false;

  constructor(@Optional() @Self() public ngControl: NgControl) {
    if (ngControl !== null) {
      ngControl.valueAccessor = this;
    }
  }

  isErrorState(
    control: AbstractControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    return this.touched && (this.ngControl?.control?.invalid ?? false);
  }

  onChange = (value: any) => {};

  onFocusOut(): void {
    this.touched = true;
    this.onTouched();
    this.matInput.updateErrorState();
  }

  onInput($event: any): void {
    this.value = $event.currentTarget.value;
    this.touched = true;
    this.onChange(this.value);
  }

  onTouched = () => {};

  onVisibilityClick($event: Event): void {
    if (this._visible) {
      this.icon = 'visibility_off';
      this.type = 'password';
    } else {
      this.icon = 'visibility';
      this.type = 'text';
    }

    // Invert the value.
    this._visible = !this._visible;

    $event.stopPropagation();
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  writeValue(obj: any): void {
    this.value = obj;
  }
}
