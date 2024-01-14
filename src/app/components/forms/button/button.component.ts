import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'xpp-button',
  template: `<button
    [disabled]="disabled"
    [class]="buttonClass"
    [type]="type"
    (click)="makeClick()"
  >
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
  @Input() disabled = false;
  @Output() onClick = new EventEmitter();

  get buttonClass(): string {
    return `btn btn-${this.color} w-100`;
  }

  makeClick = (): void => this.onClick?.emit();
}
