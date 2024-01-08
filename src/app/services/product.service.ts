import { Injectable } from '@angular/core';
import { Product } from '../models/Product';
import { DataServiceLocal } from './data.services/data.service.local';
import { CustomValidators } from '../components/forms/models/Validators';
import { FormGroupSchema } from '../components/forms/models/FormGroupBuilder';
import { Observable, delay, first, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductService extends DataServiceLocal<Product> {
  private formSchema: FormGroupSchema = {
    name: [CustomValidators.required],
    code: [CustomValidators.required],
    price: [
      CustomValidators.required,
      CustomValidators.minValue(0.01),
      CustomValidators.maxValue(9999),
    ],
  };

  private init = false;

  constructor() {
    super();
    this.initSchema(this.formSchema);
    this.updateItemMethod = this.updateItemRequest;
    this.fetchInitMethod = this.fetchItem;
    this.load();
  }

  updateItemRequest = (item: Product): Observable<boolean> => {
    return of(true).pipe(delay(500));
  };

  fetchItem = (): Observable<Product | undefined> => {
    if (this.init) return of(this.selectedItem.value).pipe(delay(500), first());
    else {
      this.init = true;
      return of({
        name: 'Odkurzacz',
        code: 'od0002',
        price: 560,
      }).pipe(delay(1000), first());
    }
  };
}
