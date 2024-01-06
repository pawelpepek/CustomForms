import { Injectable } from '@angular/core';
import { ToDo } from '../models/ToDo';
import { DataService } from '../components/forms/data.service';
import { FormGroupSchema } from '../components/forms/models/FormGroupBuilder';
import { CustomValidators } from '../components/forms/models/Validators';
import { RequestService } from './requests.service';
import { Todos } from '../data/Todos';
import { TodoAliases } from '../data/TodoAliases';

@Injectable({ providedIn: 'root' })
export class ToDoService extends DataService<ToDo> {
  private formSchema: FormGroupSchema = {
    description: [CustomValidators.required],
    priority: [CustomValidators.required],
  };

  constructor(private requestService: RequestService<ToDo>) {
    super();
    this.initSchema(this.formSchema);

    this.updateItemMethod = this.requestService.updateItem;
    this.addItemMethod = this.requestService.addItem;

    this.items.next(Todos.data);
    this.tableAliases = TodoAliases.data;
  }
}
