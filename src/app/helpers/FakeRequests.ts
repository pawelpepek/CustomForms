import { Observable, delay, of } from 'rxjs';
import { IsObjectsEquals } from './Comparision';
import { AppModule } from '../app.module';
import { HttpClient } from '@angular/common/http';
import { DataWithNewIem } from '../services/data.services/data.service.refresh';

export class FakeRequests<T> {
  private items: T[] = [];
  private http: HttpClient;

  constructor() {
    this.http = AppModule.injector.get(HttpClient);
  }

  public setItems = (items: T[]): void => {
    this.items = items;
  };

  updateItem = (item: T): Observable<boolean> =>
    this.returnMethodOrError(item, this.delayRequest(true));

  updateItemWithRefresh = (item: T): Observable<T[]> =>
    this.returnMethodOrError(item, this.updateItemWithRefreshOk(item));
  updateItemWithRefreshOk = (item: T): Observable<T[]> => {
    this.items = [...this.items];

    const indexToReplace = this.items.findIndex((i) =>
      IsObjectsEquals(item, i)
    );

    if (indexToReplace >= 0) {
      this.items[indexToReplace] = item;
    }

    return this.delayRequest(this.items);
  };

  addItemWithRefresh = (id: keyof T) => {
    return (item: T) =>
      this.returnMethodOrError(item, this.addItemWithRefreshMethod(id, item));
  };

  addItemWithRefreshMethod = (id: keyof T, item: T) => {
    (item as any)[id] = Number.MAX_VALUE * Math.random();
    this.items = [...this.items, item];

    return this.delayRequest({
      item,
      items: this.items,
    });
  };

  addItem = (id: keyof T) => {
    return (item: T) =>
      this.returnMethodOrError(item, this.addItemMethod(item, id));
  };

  addItemMethod = (item: T, id: keyof T): Observable<T> => {
    (item as any)[id] = Number.MAX_VALUE * Math.random();

    return this.delayRequest(item);
  };

  deleteItem = (item: T): Observable<boolean> => {
    const obj = item as any;
    if (obj['id'] == 2) return this.error<boolean>();
    this.items = this.items.filter((i) => !IsObjectsEquals(i, item));
    return this.delayRequest(true);
  };

  fetchItems = (): Observable<T[]> => this.delayRequest(this.items);

  private delayRequest = <S>(value: S) => {
    return of(value).pipe(delay(500));
  };

  private isError = (item: T) => {
    const obj = item as any;
    for (const key in obj) {
      if (obj.hasOwnProperty(key) && obj[key] === 'error') {
        return true;
      }
    }
    return false;
  };

  private returnMethodOrError = <S>(item: T, method: S) => {
    return this.isError(item)
      ? (this.http.get<T>('/weatherforecast') as S)
      : method;
  };

  private error = <S>() => this.http.get<S>('/weatherforecast');
}
