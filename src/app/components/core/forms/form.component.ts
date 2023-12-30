import { Component, Input, TemplateRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastService } from './toast/toast-service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent {
  @Input() formGroup!: FormGroup;
  @Input() updateMethod?: (data: any) => Observable<any>;

  constructor(private toastService: ToastService) {}

  onSubmit(
    templateSuccess: TemplateRef<any>,
    templateError: TemplateRef<any>
  ): void {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      this.showToast(templateError, 'danger');
    } else {
      if (!!this.updateMethod) {
        this.updateMethod(this.formGroup.getRawValue()).subscribe((res) => {
          if (!!res) {
            this.showToast(templateSuccess, 'success');
            // this.formGroup.reset();
          }
        });
      }
    }
  }

  cleanErrors(): void {
    this.formGroup.markAsUntouched();
  }

  private showToast(
    template: TemplateRef<any>,
    color: 'success' | 'danger'
  ): void {
    this.toastService.show({
      template,
      classname: `bg-${color} text-light`,
      delay: 5000,
    });
  }
}
