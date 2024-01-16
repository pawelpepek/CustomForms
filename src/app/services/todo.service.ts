import { Injectable } from '@angular/core';
import { ToDo } from '../models/ToDo';
import { DataServiceLocal } from './data.services/data.service.local';
import { FormGroupSchema } from '../components/forms/models/FormGroupBuilder';
import { CustomValidators } from '../components/forms/models/Validators';
import { TodoRequestsService } from './requests/todo.requests.service';
import { Priorities } from '../data/Priorities';

@Injectable({ providedIn: 'root' })
export class ToDoService extends DataServiceLocal<ToDo> {
  private formSchema: FormGroupSchema = {
    description: [CustomValidators.required, CustomValidators.maxLength(30)],
    priority: [CustomValidators.required],
  };

  constructor(private requestService: TodoRequestsService) {
    super();
    
    this.initSchema(this.formSchema);
    this.updateItemMethod = this.requestService.updateItem;
    this.addItemMethod = this.requestService.addItem;
    this.deleteItemMethod = this.requestService.deleteItem;
    this.fetchItemsMethod = requestService.fetchItems;

    this.tableAliases = [
      { value: 'description', text: 'Zadanie' },
      { value: 'priority', text: 'Priorytet', map: Priorities.data },
    ];
  }
}
