import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToDoService } from '../../../services/todo.service';

@Component({
  selector: 'app-todo-table',
  template: `<app-table [service]="service"></app-table>`,
})



export class ToDoTableComponent {
  constructor(public service: ToDoService) {}
}
