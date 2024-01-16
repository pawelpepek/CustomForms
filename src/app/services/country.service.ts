import { Injectable } from '@angular/core';
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
}
