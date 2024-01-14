import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  template: `<div [class]="getClass()">
    <div class="card-body p-4">
      <h5 class="card-title mb-4">{{ label }}</h5>
      <ng-content></ng-content>
    </div>
  </div>`,
})
export class CardComponent {
  @Input() label!: string;
  @Input() className?: string;

  getClass = (): string => `card w-100 bg-body-tertiary ${this.className}`;
}
