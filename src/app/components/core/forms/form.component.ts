import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent {
  @Input() formGroup!: FormGroup;

  constructor() {}

  onSubmit(): void {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
    } else {
      console.log(this.formGroup.getRawValue());
    }
  }

  cleanErrors(): void {
    this.formGroup.markAsUntouched();
  }
}
