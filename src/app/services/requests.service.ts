import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';

type HasIdProperty<T> = T extends { id: any } ? true : false;

@Injectable({ providedIn: 'root' })
export class RequestService<T> {
  updateItem = (data: T): Observable<boolean> => this.delayRequest(true);

  addItem=(id: keyof T)=>{
    return (data:T)=>this.addItemMethod(data,id)
  }

  addItemMethod = (data: T, id: keyof T): Observable<T> => {
    (data as any)[id] = Number.MAX_VALUE * Math.random();

    return this.delayRequest(data);
  };

  deleteItem = (data: T): Observable<boolean> => this.delayRequest(true);

  private delayRequest<S>(value: S) {
    return of(value).pipe(delay(500));
  }
}
