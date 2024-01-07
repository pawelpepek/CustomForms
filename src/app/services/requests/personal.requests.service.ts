import { Injectable } from '@angular/core';
import { FakeRequests } from '../../helpers/FakeRequests';
import { Person } from '../../models/Person';

@Injectable({ providedIn: 'root' })
export class PersonalRequestsService {
  private fakeRequests = new FakeRequests<Person>();

  updateItem = this.fakeRequests.updateItem;
}
