import { Component } from '@angular/core';
import { ToDoService } from '../../services/todo.service';
import { Priorities } from '../../data/Priorities';

@Component({
  selector: 'app-todo-page',
  templateUrl: `./todo-page.component.html`,
})
export class ToDoPageComponent {
  priorities = Priorities.data;
  constructor(public service: ToDoService) {}
}
