import { Injectable } from '@angular/core';
import { Observable, Subject, first } from 'rxjs';
import { Contact } from '../models/Contact';

@Injectable({ providedIn: 'root' })
export class ContactService {
  positions = [
    { value: 1, text: 'Robotnik budowlany' },
    { value: 2, text: 'Kierownik budowy' },
    { value: 3, text: 'Kierowca' },
    { value: 4, text: 'Pracownik biurowy' },
  ];

  contact = new Subject<Contact>();

  public save = (data: any): Observable<any> => {
    setTimeout(() => {
      const contact = data as Contact;

      const position = this.positions.find((p) => p.value == data.position);
      if (!!position) contact.position = position;

      this.contact.next(contact);
    }, 300);

    return this.contact.pipe(first());
  };
}
