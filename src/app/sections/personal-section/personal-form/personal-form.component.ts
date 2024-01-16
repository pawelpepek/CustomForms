import { Component } from '@angular/core';
import { ToastService } from '../../../components/forms/toast/toast-service';
import { PersonalService } from '../../../services/personal.service';
import { Positions } from '../../../data/Positions';

@Component({
  selector: 'app-personal-form',
  templateUrl: './personal-form.component.html',
})
export class PersonalFormComponent {
  positions = Positions.data;
  constructor(
    public personalService: PersonalService,
    private toastService: ToastService
  ) {}

  onChangedList(value: any) {
    this.toastService.showToast('primary', `W liście wybrano pozycję ${value}`);
  }

  onChangedName(value: any) {
    this.toastService.showToast('primary', `Wpisano wartość ${value}`);
  }
}
