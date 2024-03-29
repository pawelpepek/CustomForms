import {
  AfterViewInit,
  Component,
  EventEmitter,
  Injector,
  Input,
  OnInit,
  Optional,
  Output,
  Self,
} from '@angular/core';
import {
  FormGroup,
  ControlContainer,
  ControlValueAccessor,
  NgControl,
  FormBuilder,
} from '@angular/forms';

@Component({
  selector: '',
  template: '',
})
export class InputBaseComponent
  implements ControlValueAccessor, OnInit, AfterViewInit
{
  @Input() label!: string;
  @Input() formControlName!: string;
  @Output() changed = new EventEmitter<any>();

  private lastValue: any;
  value: any;
  onChange: any = () => {};
  onTouch: any = () => {};
  ngControl: NgControl | null = null;
  formGroup?: FormGroup;

  constructor(
    @Optional() @Self() private controlContainer: ControlContainer,
    private injector: Injector,
    private fb: FormBuilder
  ) {}

  get control() {
    return this.formGroup?.get(this.formControlName);
  }

  public get required(): boolean {
    if (!!this.control) {
      const validators = (this.control as any)._rawValidators as any[];
      return validators.some((v) => v.toString().startsWith('required('));
    }
    return false;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.formGroup = this.ngControl?.control?.parent as FormGroup;
      this.control?.valueChanges.subscribe((value) => {
        if (value != this.lastValue) {
          this.changed?.emit(value);
        }
        this.lastValue = value;
      });
    }, 10);
  }
  ngOnInit(): void {
    this.ngControl = this.injector.get(NgControl, null);
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {}

  showError = (): boolean => {
    return !!this.control && this.control?.touched && this.control?.invalid;
  };
  errorMessage = (): string => {
    return (this.control?.errors as { message: string })?.message?.replace(
      '{field}',
      this.label
    );
  };

  keyPress(keyEvent: KeyboardEvent): void {
    const key = keyEvent.key.toLowerCase();

    if (key == 'delete' || key == 'backspace') {
      const control = this.formGroup?.get(this.formControlName);
      if (!!control) control.patchValue(null);
    }
  }
}
