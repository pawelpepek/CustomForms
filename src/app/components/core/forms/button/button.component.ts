import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  template: `<button [class]="buttonClass" [type]="type" (click)="onClick()">
    {{ label }}
  </button>`,
})
export class ButtonComponent {
  @Input() label!: string;
  @Input() color:
    | 'primary'
    | 'warning'
    | 'success'
    | 'danger'
    | 'secondary'
    | 'info' = 'primary';
  @Input() type: 'button' | 'reset' | 'submit' = 'button';
  @Output() click = new EventEmitter();

  get buttonClass(): string {
    return `btn btn-${this.color} w-100`;
  }

  onClick = () :void=> this.click?.emit();
}
