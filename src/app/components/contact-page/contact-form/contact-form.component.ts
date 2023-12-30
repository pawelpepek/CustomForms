import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CustomValidators } from '../../core/forms/Validators';
import { ContactService } from '../../../services/contact.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
})
export class ContactFormComponent implements OnInit {
  myForm!: FormGroup;

  constructor(private fb: FormBuilder, public contactService: ContactService) {}

  ngOnInit(): void {
    this.myForm = this.fb.group({
      firstName: ['', [CustomValidators.required]],
      lastName: ['', [CustomValidators.required]],
      email: ['', [CustomValidators.required, CustomValidators.email]],
      position: ['', [CustomValidators.required]],
      address: this.fb.group({
        street: ['', CustomValidators.required],
        city: ['', CustomValidators.required],
        zip: ['', CustomValidators.required, CustomValidators.maxLength(6)],
      }),
    });
  }
}
