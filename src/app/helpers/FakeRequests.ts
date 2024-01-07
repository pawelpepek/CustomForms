import { Observable, delay, of } from 'rxjs';
import { IsObjectsEquals } from './Comparision';

export class FakeRequests<T> {
  items: T[] = [];

  public setItems = (items: T[]): void => {
    this.items = items;
  };

  updateItem = (item: T): Observable<boolean> => this.delayRequest(true);

  updateItemWithRefresh = (item: T) => {
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
    return (item: T) => {
      (item as any)[id] = Number.MAX_VALUE * Math.random();
      this.items = [...this.items, item];

      return this.delayRequest({
        item,
        items: this.items,
      });
    };
  };

  addItem = (id: keyof T) => {
    return (item: T) => this.addItemMethod(item, id);
  };

  addItemMethod = (item: T, id: keyof T): Observable<T> => {
    (item as any)[id] = Number.MAX_VALUE * Math.random();

    return this.delayRequest(item);
  };

  deleteItem = (item: T): Observable<boolean> => {
    this.items = this.items.filter((i) => !IsObjectsEquals(i, item));
    return this.delayRequest(true);
  };

  fetchItems = (): Observable<T[]> => this.delayRequest(this.items);

  private delayRequest = <S>(value: S) => {
    return of(value).pipe(delay(500));
  };
}
