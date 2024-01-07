import { Injectable } from '@angular/core';
import { Contact } from '../models/Contact';
import { FormGroupSchema } from '../components/forms/models/FormGroupBuilder';
import { CustomValidators } from '../components/forms/models/Validators';
import { DataServiceLocal } from './data.services/data.service.local';
import { Observable } from 'rxjs';
import { ModalService } from './modal.service';
import { ContactRequestsService } from './requests/contact.requests.service';

@Injectable({ providedIn: 'root' })
export class ContactService extends DataServiceLocal<Contact> {
  private formSchema: FormGroupSchema = {
    firstName: [CustomValidators.required],
    lastName: [CustomValidators.required],
    email: [CustomValidators.email, CustomValidators.required],
  };

  constructor(
    private ownModalService: ModalService,
    private requestService: ContactRequestsService
  ) {
    super();
    this.initSchema(this.formSchema);
    this.updateItemMethod = this.updateItemRequest;
  }

  public get modalService() {
    return this.ownModalService;
  }

  updateItemRequest = (item: Contact): Observable<boolean> => {
    return this.requestService
      .updateItem(item)
      .pipe(this.modalService.modalTap('contact'));
  };
}
