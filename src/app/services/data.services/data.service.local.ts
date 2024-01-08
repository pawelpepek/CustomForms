import { Observable, tap } from 'rxjs';
import { DataServiceBase } from './data.service.base';
import { IsObjectsEquals } from '../../helpers/Comparision';

export abstract class DataServiceLocal<T> extends DataServiceBase<T> {
  protected updateItemMethod?: (data: T) => Observable<boolean>;
  protected addItemMethod?: (data: T) => Observable<T>;

  protected override isAddMethod = (): boolean => !!this.addItemMethod;
  protected override isUpdateMethod = (): boolean => !!this.updateItemMethod;

  protected override addItem(item: T): Observable<T> | null {
    if (!this.addItemMethod) return null;

    return this.addItemMethod(item).pipe(tap(this.addResult));
  }

  private addResult = (result: T): void => {
    if (result) {
      this.finalizeSuccess(result);
      this.items.next([...this.items.value, result]);
    }
  };

  protected override updateItem(item: T): Observable<any> | null {
    if (!this.updateItemMethod) return null;

    return this.updateItemMethod(item).pipe(
      tap((result: boolean) => this.updateResult(result, item))
    );
  }

  private updateResult = (result: boolean, item: T): void => {
    if (result) {
      this.replaceSelectedItem(item);
      this.finalizeSuccess(item);
    }
  };

  private replaceSelectedItem(data: T | undefined) {
    const indexToReplace = this.items.value.findIndex((item) =>
      IsObjectsEquals(this.selectedItem.value, item)
    );

    if (indexToReplace >= 0) {
      const items = [...this.items.value];
      if (!!data) items[indexToReplace] = data;

      this.items.next(items);
    }
  }
}
