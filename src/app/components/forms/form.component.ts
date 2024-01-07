import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastService } from './toast/toast-service';
import { DataService } from '../../services/data.service';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styles: `.disabled{  pointer-events:none;} `,
})
export class FormComponent<T> {
  @Input() formGroup!: FormGroup;
  @Input() service!: DataService<T>;
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
