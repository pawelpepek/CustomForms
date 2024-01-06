import { Component } from '@angular/core';
import { ToDoService } from '../../../services/todo.service';
import { Priorities } from '../../../data/Priorities';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
})
export class ToDoFormComponent {
    priorities=Priorities.data
  constructor(public todoService: ToDoService) {}
}
