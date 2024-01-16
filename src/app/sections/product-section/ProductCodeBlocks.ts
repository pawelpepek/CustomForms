export const PRODUCT_CODE_BLOCKS = [
  {
    fileName: 'product-form.html',
    code: `<xpp-form 
    [formGroup]="productService.form" 
    [service]="productService" 
    [clearButton]="true" 
    [refreshButton]="true">
    <div class="d-flex flex-row">
        <div class="w-100">
            <xpp-input 
                label="Kod" 
                formControlName="code">
            </xpp-input>
            <xpp-input 
                label="Nazwa" 
                formControlName="name">
            </xpp-input>
            <xpp-input 
                label="Cena" 
                type="number" 
                formControlName="price">
            </xpp-input>
        </div>
    </div>
</xpp-form>`,
  },
  {
    fileName: 'product-form.ts',
    code: `import { Component } from '@angular/core';
import { ProductService } from '../../../services/product.service';

@Component({
    selector: 'app-product-form',
    templateUrl: './product-form.component.html',
})
export class ProductFormComponent {
    constructor(public productService: ProductService) {}
}`,
  },
  {
    fileName: 'product.service.ts',
    code: `import { Injectable } from '@angular/core';
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
}`,
  },
];
