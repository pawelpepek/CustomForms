export const TODO_CODE_BLOCKS=[
    {
      fileName: 'todo-form.component.html',
      code: `<xpp-form 
  [formGroup]="service.form" 
  [service]="service" 
  [clearButton]="true">
  <div class="d-flex flex-row">
      <xpp-input 
          label="Zadanie" 
          class="w-100 me-2" 
          formControlName="description">
      </xpp-input>
      <xpp-select 
          label="Priorytet" 
          [style]="{ width: '200px' }" 
          formControlName="priority"
          [data]="priorities">
      </xpp-select>
  </div>
</xpp-form>
<xpp-table [service]="service"></xpp-table>`,
    },
    {
      fileName: 'todo-form.component.ts',
      code: `import { Component } from '@angular/core';
import { ToDoService } from '../../services/todo.service';
import { Priorities } from '../../data/Priorities';

@Component({
  selector: 'app-todo-page',
  templateUrl: "./todo-page.component.html",
})
export class ToDoPageComponent {
  priorities = Priorities.data;

  constructor(public service: ToDoService) {}
}`,
    },
    {
      fileName: 'todo.service.ts',
      code: `import { Injectable } from '@angular/core';
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
}`,
    },
  ];