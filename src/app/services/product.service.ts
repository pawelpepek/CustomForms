import { Injectable } from '@angular/core';
import { Product } from '../models/Product';
import { DataServiceLocal } from './data.services/data.service.local';
import { FormGroupSchema } from '../components/forms/models/FormGroupBuilder';
import { Observable } from 'rxjs';
import { ProductRequestsService } from './requests/product.requests.service';
import {
  CustomValidators,
  NumberValidators,
} from '../components/forms/models/Validators';

@Injectable({ providedIn: 'root' })
export class ProductService extends DataServiceLocal<Product> {
  private formSchema: FormGroupSchema = {
    name: [CustomValidators.required],
    code: [CustomValidators.required],
    price: [
      CustomValidators.required,
      NumberValidators.minValue(0.01),
      NumberValidators.maxValue(9999),
    ],
  };

  constructor(private productRequestService: ProductRequestsService) {
    super();
    this.initSchema(this.formSchema);
    this.updateItemMethod = this.productRequestService.updateItemRequest;
    this.fetchInitMethod = this.fetchItem;
    this.load();
  }

  fetchItem = (): Observable<Product | undefined> =>
    this.productRequestService.fetchItem(this.selectedItem.value);
}
