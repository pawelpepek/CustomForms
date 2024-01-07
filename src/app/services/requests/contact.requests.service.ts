import { Injectable } from '@angular/core';
import { FakeRequests } from '../../helpers/FakeRequests';
import { Contact } from '../../models/Contact';

@Injectable({ providedIn: 'root' })
export class ContactRequestsService {
  private fakeRequests = new FakeRequests<Contact>();

  updateItem = this.fakeRequests.updateItem;
}
