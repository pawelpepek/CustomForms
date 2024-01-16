import { Injectable } from '@angular/core';
import { Product } from '../../models/Product';
import { Observable, delay, first, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductRequestsService {
  private init = false;

  fetchItem = (
    product: Product | undefined
  ): Observable<Product | undefined> => {
    if (this.init) return of(product).pipe(delay(500), first());
    else {
      this.init = true;
      return of({
        name: 'Odkurzacz',
        code: 'od0002',
        price: 560,
      }).pipe(delay(1000), first());
    }
  };

  updateItemRequest = (item: Product): Observable<boolean> => {
    return of(true).pipe(delay(500));
  };
}
