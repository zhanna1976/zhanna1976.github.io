import { AbstractControl } from '@angular/forms';

export function ValidatePxWidth(
  control: AbstractControl
): { [key: string]: any } | null {
  const value = parseInt(control.value.substring(0, control.value.length - 2));
  const pxValue = control.value.substring(
    control.value.length - 2,
    control.value.length
  );
  if (control.value && (value < 0 || value > 390 || pxValue !== 'px')) {
    return { validatePxInvalid: true };
  } else {
    return null;
  }
}
export function ValidatePxHeight(
  control: AbstractControl
): { [key: string]: any } | null {
  const value = parseInt(control.value.substring(0, control.value.length - 2));
  const pxValue = control.value.substring(
    control.value.length - 2,
    control.value.length
  );
  if (control.value && (value < 10 || value > 70 || pxValue !== 'px')) {
    return { validatePxInvalid: true };
  } else {
    return null;
  }
}
export function ValidatePxFont(
  control: AbstractControl
): { [key: string]: any } | null {
  const value = parseInt(control.value.substring(0, control.value.length - 2));
  const pxValue = control.value.substring(
    control.value.length - 2,
    control.value.length
  );
  if (control.value && (value < 5 || value > 30 || pxValue !== 'px')) {
    return { validatePxInvalid: true };
  } else {
    return null;
  }
}
