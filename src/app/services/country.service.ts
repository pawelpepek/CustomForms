import { Injectable } from '@angular/core';
import { FormGroupSchema } from '../components/forms/models/FormGroupBuilder';
import { CustomValidators } from '../components/forms/models/Validators';
import { CountryRequestsService } from './requests/country.requests.service';
import { DataServiceRefresh } from './data.services/data.service.refresh';
import { Country } from '../models/Country';
import { CountryAliases } from '../data/CountryAliases';

@Injectable({ providedIn: 'root' })
export class CountryService extends DataServiceRefresh<Country> {
  private formSchema: FormGroupSchema = {
    name: [CustomValidators.required],
    capital: [CustomValidators.required],
  };

  constructor(private requestService: CountryRequestsService) {
    super();
    this.initSchema(this.formSchema);

    this.updateItemMethod = this.requestService.updateItem;

    this.addItemMethod = this.requestService.addItem;
    this.deleteItemMethod = this.requestService.deleteItem;
    this.fetchItemsMethod = requestService.fetchItems;

    this.tableAliases = CountryAliases.data;
  }
}
