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

    updateItemRequest = (item: Product): Observable<boolean> => of(true).pipe(delay(500));

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
}`,
  },
];
