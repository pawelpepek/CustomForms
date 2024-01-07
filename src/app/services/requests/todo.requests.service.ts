import { Injectable } from '@angular/core';
import { FakeRequests } from '../../helpers/FakeRequests';
import { Todos } from '../../data/Todos';
import { ToDo } from '../../models/ToDo';

@Injectable({ providedIn: 'root' })
export class TodoRequestsService {
  private fakeRequests = new FakeRequests<ToDo>();

  constructor() {
    this.fakeRequests.setItems(Todos.data);
  }

  updateItem = this.fakeRequests.updateItem;
  addItem = this.fakeRequests.addItem('id');
  deleteItem = this.fakeRequests.deleteItem;
  fetchItems = this.fakeRequests.fetchItems;
}
