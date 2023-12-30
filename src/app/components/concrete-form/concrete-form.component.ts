import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CustomValidators } from '../core/forms/Validators';

@Component({
  selector: 'app-concrete-form',
  templateUrl: './concrete-form.component.html',
})
export class ConcreteFormComponent implements OnInit {
  myForm!: FormGroup;

  topics = [
    { value: 1, text: 'Oferta cenowa' },
    { value: 2, text: 'Reklamacja' },
    { value: 3, text: 'Współpraca' },
    { value: 4, text: 'Praca' },
  ];
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.myForm = this.fb.group({
      firstName: ['', [CustomValidators.required]],
      lastName: ['', [CustomValidators.required]],
      email: ['', [CustomValidators.required, CustomValidators.email]],
      topic: ['', [CustomValidators.required]],
      address: this.fb.group({
        street: ['', CustomValidators.required],
        city: ['', CustomValidators.required],
        zip: ['', CustomValidators.required, CustomValidators.maxLength(6)],
      }),
    });
  }
}
