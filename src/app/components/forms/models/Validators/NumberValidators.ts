import { AbstractControl, ValidationErrors } from '@angular/forms';
import { getErrorMessage } from './ValidatorsHelper';

export class NumberValidators {
  public static maxValue = (max: number) => {
    return (control: AbstractControl) =>
      NumberValidators.maxValueFunction(max, control);
  };

  public static minValue = (min: number) => {
    return (control: AbstractControl) =>
      NumberValidators.minValueFunction(min, control);
  };

  private static minValueFunction = (
    min: number,
    control: AbstractControl
  ): ValidationErrors | null => {
    if (control.value == null || control.value == undefined) return null;

    const value = +control.value;

    const result = getErrorMessage(
      value < min,
      `Wartość pola "{field}" nie może być mniejsza niż ${min}`
    );

    return result;
  };

  private static maxValueFunction = (
    max: number,
    control: AbstractControl
  ): ValidationErrors | null => {
    if (control.value == null || control.value == undefined) return null;

    const value = +control.value;

    const result = getErrorMessage(
      value > max,
      `Wartość pola "{field}" nie może być większa niż ${max}`
    );

    return result;
  };
}
