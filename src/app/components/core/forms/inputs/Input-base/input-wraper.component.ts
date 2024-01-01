import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input-wrapper',
  templateUrl: './input-wrapper.component.html',
  styleUrl: './input-wrapper.component.scss',
})
export class InputWrapperComponent {
  @Input() showError: boolean = false;
  @Input() errorMessage: string = '';
  @Input() formGroup!: FormGroup<any>;
  @Input() label!: string;
  @Input() name!: string;
  @Input() notSelected = false;
  @Input() required = false;

  get controlLabel(): string {
    return `${this.label}${this.required ? '*' : ''}`;
  }
}
