import { AbstractControl, ValidationErrors, Validators } from '@angular/forms';
import { getErrorMessage } from './ValidatorsHelper';

export class CustomValidators {
  public static required(control: AbstractControl): ValidationErrors | null {
    const req = Validators.required(control) as { required: boolean };
    return getErrorMessage(
      req?.required,
      'Pole "{field}" jest obowiązkowe'
    );
  }
}
