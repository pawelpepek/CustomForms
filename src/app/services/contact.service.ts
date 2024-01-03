import { Injectable } from '@angular/core';
import { Contact } from '../models/Contact';
import { FormBuilder } from '@angular/forms';
import { FormGroupSchema } from '../components/core/forms/models/FormGroupBuilder';
import { CustomValidators } from '../components/core/forms/models/Validators';
import { DataService } from '../components/core/forms/data.service';
import { Observable, delay, of } from 'rxjs';
import { ToastService } from '../components/core/forms/toast/toast-service';

@Injectable({ providedIn: 'root' })
export class ContactService extends DataService<Contact> {
  public positions = [
    { value: 1, text: 'Robotnik budowlany' },
    { value: 2, text: 'Kierownik budowy' },
    { value: 3, text: 'Kierowca' },
    { value: 4, text: 'Pracownik biurowy' },
  ];

  private formSchema: FormGroupSchema = {
    firstName: [CustomValidators.required],
    lastName: [CustomValidators.required],
    email: [CustomValidators.email, CustomValidators.required],
    position: [CustomValidators.required],
    address: {
      street: [CustomValidators.required],
      city: [CustomValidators.required],
      zip: [CustomValidators.required, CustomValidators.maxLength(6)],
    },
  };

  constructor(fb: FormBuilder, toastService:ToastService) {
    super(fb, toastService);
    this.initSchema(this.formSchema);
    this.updateItemMethod = this.updateItem;
  }

  protected override prepareItem(formData: any, data: Contact): void {
    const position = this.positions.find((p) => p.value == formData.position);
    if (!!position) data.position = position;
  }

  updateItem = (data: Contact): Observable<boolean> => {
    return of(true).pipe(delay(500));
  };
}
