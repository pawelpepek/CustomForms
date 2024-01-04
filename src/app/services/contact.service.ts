import { Injectable } from '@angular/core';
import { Contact } from '../models/Contact';
import { FormBuilder } from '@angular/forms';
import { FormGroupSchema } from '../components/core/forms/models/FormGroupBuilder';
import { CustomValidators } from '../components/core/forms/models/Validators';
import { DataService } from '../components/core/forms/data.service';
import { Observable} from 'rxjs';
import { ToastService } from '../components/core/forms/toast/toast-service';
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
    fb: FormBuilder,
    toastService: ToastService,
    private ownModalService: ModalService,
    private requestService: RequestService<Contact>
  ) {
    super(fb, toastService);
    this.initSchema(this.formSchema);
    this.updateItemMethod = this.updateItem;
  }

  public get modalService() {
    return this.ownModalService;
  }

  updateItem = (data: Contact): Observable<boolean> => {
    return this.requestService
      .updateItem(data)
      .pipe(this.modalService.modalTap("contact"));
  };
}
