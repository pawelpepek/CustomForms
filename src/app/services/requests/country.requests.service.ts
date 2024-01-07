import { Injectable } from '@angular/core';
import { FakeRequests } from '../../helpers/FakeRequests';
import { Country } from '../../models/Country';
import { Countries } from '../../data/Countries';

@Injectable({ providedIn: 'root' })
export class CountryRequestsService {
  private fakeRequests = new FakeRequests<Country>();

  constructor() {
    this.fakeRequests.setItems(Countries.data);
  }

  updateItem = this.fakeRequests.updateItemWithRefresh;
  addItem = this.fakeRequests.addItemWithRefresh('id');
  deleteItem = this.fakeRequests.deleteItem;
  fetchItems = this.fakeRequests.fetchItems;
}
