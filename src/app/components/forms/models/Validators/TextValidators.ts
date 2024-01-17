import { AbstractControl, ValidationErrors, Validators } from '@angular/forms';
import { CustomValidators } from './CustomValidators';
import { getErrorMessage } from './ValidatorsHelper';

export class TextValidators {
  public static maxLength = (length: number) => {
    return (control: AbstractControl) =>
      TextValidators.maxLengthFunction(length, control);
  };

  public static minLength = (length: number) => {
    return (control: AbstractControl) =>
      TextValidators.minLengthFunction(length, control);
  };

  public static email(control: AbstractControl): ValidationErrors | null {
    if (!!CustomValidators.required(control)) return null;

    const mail = Validators.email(control) as { email: boolean };
    return getErrorMessage(mail?.email, 'Niepoprawny adres mailowy');
  }

  private static maxLengthFunction = (
    length: number,
    control: AbstractControl
  ): ValidationErrors | null => {
    const value = control.value + '';

    const result = getErrorMessage(
      value && value.length > length,
      `Długość tekstu pola "{field}" nie może być większa niż ${length}`
    );

    return result;
  };

  private static minLengthFunction = (
    length: number,
    control: AbstractControl
  ): ValidationErrors | null => {
    const value = control.value + '';

    const result = getErrorMessage(
      value && value.length < length,
      `Długość tekstu pola "{field}" nie może być mniejsza niż ${length}`
    );

    return result;
  };
}
