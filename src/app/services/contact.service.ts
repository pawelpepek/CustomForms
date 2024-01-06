import { Injectable } from '@angular/core';
import { Contact } from '../models/Contact';
import { FormGroupSchema } from '../components/forms/models/FormGroupBuilder';
import { CustomValidators } from '../components/forms/models/Validators';
import { DataService } from './data.service';
import { Observable } from 'rxjs';
import { ModalService } from './modal.service';
import { RequestService } from './requests.service';

@Injectable({ providedIn: 'root' })
export class ContactService extends DataService<Contact> {
  private formSchema: FormGroupSchema = {
    firstName: [CustomValidators.required],
    lastName: [CustomValidators.required],
    email: [CustomValidators.email, CustomValidators.required],
  };

  constructor(
    private ownModalService: ModalService,
    private requestService: RequestService<Contact>
  ) {
    super();
    this.initSchema(this.formSchema);
    this.updateItemMethod = this.updateItem;
  }

  public get modalService() {
    return this.ownModalService;
  }

  updateItem = (data: Contact): Observable<boolean> => {
    return this.requestService
      .updateItem(data)
      .pipe(this.modalService.modalTap('contact'));
  };
}
