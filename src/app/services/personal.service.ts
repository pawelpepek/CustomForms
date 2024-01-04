import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroupSchema } from '../components/core/forms/models/FormGroupBuilder';
import { CustomValidators } from '../components/core/forms/models/Validators';
import { DataService } from '../components/core/forms/data.service';
import { Observable } from 'rxjs';
import { ToastService } from '../components/core/forms/toast/toast-service';
import { Person } from '../models/Person';
import { ModalService } from './modal.service';
import { RequestService } from './requests.service';

@Injectable({ providedIn: 'root' })
export class PersonalService extends DataService<Person> {
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

  constructor(
    fb: FormBuilder,
    toastService: ToastService,
    private ownModalService: ModalService,
    private requestService: RequestService<Person>
  ) {
    super(fb, toastService);
    this.initSchema(this.formSchema);
    this.updateItemMethod = this.updateItem;
  }

  protected override prepareItem(formData: any, item: Person): void {
    const position = this.positions.find((p) => p.value == formData.position);
    if (!!position) item.position = position;
  }

  protected override prepareForm(formData: any, item: Person): void {
    formData.position = item.position.value;
  }

  public get modalService() {
    return this.ownModalService;
  }

  public updateItem = (data: Person): Observable<boolean> => {
    return this.requestService
      .updateItem(data)
      .pipe(this.modalService.modalTap('person'));
  };
}
