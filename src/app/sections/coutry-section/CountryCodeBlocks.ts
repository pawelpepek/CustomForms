export const COUNTRY_CODE_BLOCKS = [
  {
    fileName: 'country-form.html',
    code: `<xpp-form 
  [formGroup]="service.form" 
  [service]="service" 
  [clearButton]="true">
  <div class="d-flex flex-row">
    <xpp-input 
      label="Państwo" 
      class="w-100 me-2" 
      formControlName="name">
    </xpp-input>
    <xpp-input 
      label="Stolica" 
      class="w-100 me-2" 
      formControlName="capital">
    </xpp-input>
  </div>
</xpp-form>
<xpp-table [service]="service"></xpp-table>`,
  },
  {
    fileName: 'country-form.ts',
    code: `import { Component } from '@angular/core';
import { CountryService } from '../../../services/country.service';

@Component({
  selector: 'app-country-form',
  templateUrl: './country-form.component.html',
})
export class CountryFormComponent {
  constructor(public service: CountryService) {}
}`,
  },
  {
    fileName: 'country.service.ts',
    code: `import { Injectable } from '@angular/core';
import { FormGroupSchema } from '../components/forms/models/FormGroupBuilder';
import { CountryRequestsService } from './requests/country.requests.service';
import { DataServiceRefresh } from './data.services/data.service.refresh';
import { Country } from '../models/Country';
import {
    CustomValidators,
    TextValidators,
} from '../components/forms/models/Validators';

@Injectable({ providedIn: 'root' })
export class CountryService extends DataServiceRefresh<Country> {
    private formSchema: FormGroupSchema = {
        name: [
            CustomValidators.required,
            TextValidators.minLength(2),
            TextValidators.maxLength(30),
        ],
        capital: [
            CustomValidators.required,
            TextValidators.minLength(2),
            TextValidators.maxLength(20),
        ],
    };
      
    constructor(private requestService: CountryRequestsService) {
        super();
    
        this.initSchema(this.formSchema);
        this.updateItemMethod = this.requestService.updateItem;
        this.addItemMethod = this.requestService.addItem;
        this.deleteItemMethod = this.requestService.deleteItem;
        this.fetchItemsMethod = requestService.fetchItems;
    
        this.tableAliases = [
          { value: 'name', text: 'Państwo' },
          { value: 'capital', text: 'Stolica' },
        ];
    }
}`,
  },
];
