import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-code',
  template: '<pre><code [highlight]="code"></code></pre>',
})
export class CodeComponent {
  @Input() code!: string;
}
