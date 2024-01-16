import { Component, HostBinding, Input } from '@angular/core';
import { CodeBlock } from './CodeBlock';

@Component({
  selector: 'app-code-tabs',
  templateUrl: './code-tabs.component.html',
})
export class CodeTabsComponent {
  @HostBinding('style.width') width = '100%';
  @Input() codeBlocks: CodeBlock[] = [];
}
