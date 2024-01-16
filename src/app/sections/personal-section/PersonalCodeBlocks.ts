const MSG_LIST = 'W liście wybrano pozycję ${value}';
const MSG_TEXT = 'Wpisano wartość ${value}';

export const PERSONAL_CODE_BLOCKS = [
  {
    fileName: 'personal-form.html',
    code: `<xpp-form 
    [formGroup]="personalService.form" 
    [service]="personalService">
    <div class="d-flex flex-row">
        <div class="me-2 w-100">
            <xpp-input 
                label="Imię" 
                formControlName="firstName" 
                (changed)="onChangedName($event)">
            </xpp-input>
            <xpp-input 
                label="Nazwisko" 
                formControlName="lastName">
            </xpp-input>
            <xpp-input 
                label="Email" 
                formControlName="email">
            </xpp-input>
            <xpp-select 
                label="Stanowisko" 
                formControlName="position" 
                [data]="positions"
                (changed)="onChangedList($event)">
            </xpp-select>
        </div>
        <div formGroupName="address" class="ms-2 w-100">
            <xpp-input 
                label="Kod pocztowy" 
                formControlName="zip">
            </xpp-input>
            <xpp-input 
                label="Miejscowość" 
                formControlName="city">
            </xpp-input>
            <xpp-input 
                label="Ulica" 
                formControlName="street">
            </xpp-input>
        </div>
    </div>
</xpp-form>`,
  },
  {
    fileName: 'personal-form.ts',
    code: `import { Component } from '@angular/core';
import { ToastService } from '../../../components/forms/toast/toast-service';
import { PersonalService } from '../../../services/personal.service';
import { Positions } from '../../../data/Positions';

@Component({
  selector: 'app-personal-form',
  templateUrl: './personal-form.component.html',
})
export class PersonalFormComponent {
  positions = Positions.data;
  constructor(
    public personalService: PersonalService,
    private toastService: ToastService
  ) {}

  onChangedList(value: any) {
    this.toastService.showToast('primary', \`${MSG_LIST}\`);
  }

  onChangedName(value: any) {
    this.toastService.showToast('primary', \`${MSG_TEXT}\`);
  }
}
`,
  },
  {
    fileName: 'personal.service.ts',
    code: `import { Injectable } from '@angular/core';
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
            street: [CustomValidators.required],
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
}`,
  },
];
