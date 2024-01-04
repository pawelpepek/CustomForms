import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RequestService<T> {
  updateItem = (data: T): Observable<boolean> => of(true).pipe(delay(500));
}
