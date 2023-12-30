import { AbstractControl, ValidationErrors, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

export interface ErrorMessage {
  message: string;
}

export class CustomValidators {
  public static maxLengthFunction(
    length: number,
    control: AbstractControl
  ): Promise<ValidationErrors | null> | null {
    const value = control.value + '';

    const result = CustomValidators.getErrorMessage(
      value && value.length > length,
      `Długość tekstu pola "{field}" nie może być większa niż ${length}`
    );

    return Promise.resolve(result);
  }

  public static maxLength(length: number) {
    return (control: AbstractControl) =>
      CustomValidators.maxLengthFunction(length, control);
  }

  public static required(control: AbstractControl): ValidationErrors | null {
    const req = Validators.required(control) as { required: boolean };
    return CustomValidators.getErrorMessage(
      req?.required,
      'Pole "{field}" jest obowiązkowe'
    );
  }

  public static email(control: AbstractControl): ValidationErrors | null {
    if (!!CustomValidators.required(control)) return null;

    const mail = Validators.email(control) as { email: boolean };
    return CustomValidators.getErrorMessage(
      mail?.email,
      'Niepoprawny adres mailowy'
    );
  }

  private static getErrorMessage = (value: any, message: string) =>
    !!value ? { message } : null;
}
