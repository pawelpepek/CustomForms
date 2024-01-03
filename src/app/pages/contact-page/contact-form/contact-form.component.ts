import { Component } from '@angular/core';
import { ContactService } from '../../../services/contact.service';
import { ToastService } from '../../../components/core/forms/toast/toast-service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
})
export class ContactFormComponent {
  constructor(
    public contactService: ContactService,
    private toastService: ToastService
  ) {}

  onChangedList(value: any) {
    this.toastService.showToast('primary', `W liście wybrano pozycję ${value}`);
  }

  onChangedName(value: any) {
    this.toastService.showToast('primary', `Wpisano wartość ${value}`);
  }
}
