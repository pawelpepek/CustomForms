import { Observable, catchError, mergeMap, tap } from 'rxjs';
import { DataServiceBase } from './data.service.base';
import { IsObjectsEquals } from '../../helpers/Comparision';

export interface DataWithNewIem<T> {
  items: T[];
  item: T;
}

export abstract class DataServiceRefresh<T> extends DataServiceBase<T> {
  protected updateItemMethod?: (data: T) => Observable<T[]>;
  protected addItemMethod?: (data: T) => Observable<DataWithNewIem<T>>;

  protected override isAddMethod = (): boolean => !!this.addItemMethod;
  protected override isUpdateMethod = (): boolean => !!this.updateItemMethod;

  protected override addItem(item: T): Observable<any> | null {
    if (!this.addItemMethod) return null;

    return this.addItemMethod(item).pipe(
      tap((res) => {
        if (res) {
          this.items.next(res.items);
          this.finalizeSuccess(res.item);
        }
      }),
      tap(undefined, (error) => {
        this.finalizeError();
      })
    );
  }
  protected override updateItem(item: T): Observable<any> | null {
    if (!this.updateItemMethod) return null;

    return this.updateItemMethod(item).pipe(
      tap((res) => {
        if (res) {
          this.items.next(res);
          const selectedItem = res.find((r) => IsObjectsEquals(item, r));
          if (!!selectedItem) this.finalizeSuccess(selectedItem);
        }
      }),
      tap(undefined, (error) => {
        this.finalizeError();
      })
    );
  }
}
