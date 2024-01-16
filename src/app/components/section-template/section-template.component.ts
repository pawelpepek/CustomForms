import { Component, Input } from '@angular/core';
import { CodeBlock } from '../code-tabs/CodeBlock';

@Component({
  selector: 'app-section-template',
  templateUrl: './section-template.component.html',
})
export class SectionTemplateComponent {
  @Input() codeBlocks: CodeBlock[] = [];
  @Input() label!:string
}
