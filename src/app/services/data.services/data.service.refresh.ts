import { Observable, tap } from 'rxjs';
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

    return this.addItemMethod(item).pipe(tap(this.addResult));
  }

  private addResult = (result: DataWithNewIem<T>) => {
    if (result) {
      this.items.next(result.items);
      this.finalizeSuccess(result.item);
    }
  };

  protected override updateItem(item: T): Observable<any> | null {
    if (!this.updateItemMethod) return null;

    return this.updateItemMethod(item).pipe(
      tap((result) => this.updateResult(result, item))
    );
  }

  private updateResult = (result: T[], item: T): void => {
    if (result) {
      this.items.next(result);
      const selectedItem = result.find((r) => IsObjectsEquals(item, r));
      if (!!selectedItem) this.finalizeSuccess(selectedItem);
    }
  };
}
