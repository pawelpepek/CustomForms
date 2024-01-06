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
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
})
export class SelectComponent
  extends InputBaseComponent
  implements ControlValueAccessor, OnInit, AfterViewInit
{
  @Input() data: { value: any; text: string }[] = [];
  private selectedIndex = 0;

  onModelChange(index: number) {
    this.selectedIndex = index;
  }

  change(target: any): void {
    this.selectedIndex = !!target ? target.selectedIndex : 0;
  }

  notSelected = (): boolean => this.selectedIndex <= 0;
}
