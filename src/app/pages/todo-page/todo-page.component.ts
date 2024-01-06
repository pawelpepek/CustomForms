import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-todo-page',
  template: `<app-card label="Pełny model CRUD">
    <app-todo-form> </app-todo-form>
    <app-todo-table></app-todo-table>
  </app-card>`,
})
export class ToDoPageComponent {}
