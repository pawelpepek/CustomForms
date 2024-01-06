import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RequestService<T> {
  updateItem = (data: T): Observable<boolean> => this.delayRequest(true);

  addItem = (data: T): Observable<T> => {
    const dataAny = data as any;

    if ('id' in dataAny) {
      dataAny['id'] = Number.MAX_VALUE * Math.random();
    }

    return this.delayRequest(dataAny as T);
  };

  deleteItem = (data: T): Observable<boolean> => this.delayRequest(true);

  private delayRequest<S>(value: S) {
    return of(value).pipe(delay(500));
  }
}
