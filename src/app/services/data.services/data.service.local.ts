import { Observable, mergeMap, tap } from 'rxjs';
import { DataServiceBase } from './data.service.base';

export abstract class DataServiceLocal<T> extends DataServiceBase<T> {
  protected updateItemMethod?: (data: T) => Observable<boolean>;
  protected addItemMethod?: (data: T) => Observable<T>;

  protected override isAddMethod = (): boolean => !!this.addItemMethod;
  protected override isUpdateMethod = (): boolean => !!this.updateItemMethod;

  protected override addItem(item: T): Observable<T> | null {
    if (!this.addItemMethod) return null;

    return this.addItemMethod(item).pipe(
      tap((res: T) => {
        if (res) {
          this.finalizeSuccess(res);
          this.items.next([...this.items.value, res]);
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
      tap((res: boolean) => {
        if (res) {
          this.replaceSelectedItem(item);
          this.finalizeSuccess(item);
        }
      }),
      tap(undefined, (error) => {
        this.finalizeError();
      })
    );
  }
}
