import { Injectable } from '@angular/core';
import { FormGroupSchema } from '../components/forms/models/FormGroupBuilder';
import { CustomValidators } from '../components/forms/models/Validators';
import { DataServiceLocal } from './data.services/data.service.local';
import { Observable } from 'rxjs';
import { Person } from '../models/Person';
import { ModalService } from './modal.service';
import { Positions } from '../data/Positions';
import { PersonalRequestsService } from './requests/personal.requests.service';

@Injectable({ providedIn: 'root' })
export class PersonalService extends DataServiceLocal<Person> {
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
