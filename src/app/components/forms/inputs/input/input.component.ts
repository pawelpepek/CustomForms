import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputBaseComponent } from '../Input-base/input-base.component';

@Component({
  selector: 'xpp-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent
  extends InputBaseComponent
  implements ControlValueAccessor, OnInit, AfterViewInit
{
  @Input() type: 'text' | 'date' | 'email' | 'number' | 'time' = 'text';
}
