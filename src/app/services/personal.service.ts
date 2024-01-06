import { Injectable } from '@angular/core';
import { FormGroupSchema } from '../components/forms/models/FormGroupBuilder';
import { CustomValidators } from '../components/forms/models/Validators';
import { DataService } from '../components/forms/data.service';
import { Observable } from 'rxjs';
import { Person } from '../models/Person';
import { ModalService } from './modal.service';
import { RequestService } from './requests.service';
import { Positions } from '../data/Positions';

@Injectable({ providedIn: 'root' })
export class PersonalService extends DataService<Person> {
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
    private ownModalService: ModalService,
    private requestService: RequestService<Person>
  ) {
    super();
    this.initSchema(this.formSchema);
    this.updateItemMethod = this.updateItem;
  }

  protected override prepareItem(formData: any, item: Person): void {
    const position = Positions.data.find((p) => p.value == formData.position);
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
