import { Component } from '@angular/core';

import { CodeBlock } from '../../components/code-tabs/CodeBlock';
import { TODO_CODE_BLOCKS } from './TodoCodeBlocks';

@Component({
  selector: 'app-todo-section',
  templateUrl: './todo-section.component.html',
})
export class ToDoSectionComponent {
  codeBlocks: CodeBlock[] = TODO_CODE_BLOCKS;
}
