import { Injectable } from '@angular/core';
import { FormGroupSchema } from '../components/forms/models/FormGroupBuilder';
import { DataServiceLocal } from './data.services/data.service.local';
import { Observable } from 'rxjs';
import { Person } from '../models/Person';
import { ModalService } from './modal.service';
import { Positions } from '../data/Positions';
import { PersonalRequestsService } from './requests/personal.requests.service';
import {
  CustomValidators,
  TextValidators,
} from '../components/forms/models/Validators';

@Injectable({ providedIn: 'root' })
export class PersonalService extends DataServiceLocal<Person> {
  private formSchema: FormGroupSchema = {
    firstName: [CustomValidators.required],
    lastName: [CustomValidators.required],
    email: [TextValidators.email, CustomValidators.required],
    position: [CustomValidators.required],
    address: {
      street: [],
      city: [CustomValidators.required],
      zip: [CustomValidators.required, TextValidators.maxLength(6)],
    },
  };

  constructor(
    private modalService: ModalService,
    private requestService: PersonalRequestsService
  ) {
    super();
    this.initSchema(this.formSchema);
    this.updateItemMethod = this.updateItemRequest;
  }

  protected override prepareItem(formData: any, item: Person): void {
    const position = Positions.data.find((p) => p.value == formData.position);
    if (!!position) item.position = position;
  }

  protected override prepareForm(formData: any, item: Person): void {
    formData.position = item.position.value;
  }

  public updateItemRequest = (item: Person): Observable<boolean> => {
    return this.requestService
      .updateItem(item)
      .pipe(this.modalService.modalTap('person'));
  };
}
