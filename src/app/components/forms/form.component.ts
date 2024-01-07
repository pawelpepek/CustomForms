import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastService } from './toast/toast-service';
import { DataServiceBase } from '../../services/data.services/data.service.base';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styles: `.disabled{  pointer-events:none;} `,
})
export class FormComponent<T> {
  @Input() formGroup!: FormGroup;
  @Input() service!: DataServiceBase<T>;
  @Input() clearButton: boolean = false;
  @Input() refreshButton: boolean = false;

  constructor(private toastService: ToastService) {}

  onSubmit(): void {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      this.toastService.showToast('danger', 'Występują błedy w formularzu');
    } else {
      this.service.save(this.formGroup.getRawValue())?.subscribe();
    }
  }

  clear(): void {
    this.formGroup.markAsUntouched();
    this.service.reset();
  }

  refresh(): void {
    this.formGroup.markAsUntouched();
    this.service.load();
  }
}
