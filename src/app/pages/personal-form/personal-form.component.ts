import {
  AfterViewInit,
  Component,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ToastService } from '../../components/forms/toast/toast-service';
import { PersonalService } from '../../services/personal.service';
import { Positions } from '../../data/Positions';

@Component({
  selector: 'app-personal-form',
  templateUrl: './personal-form.component.html',
})
export class PersonalFormComponent implements AfterViewInit {
  @ViewChild('personal') modal!: TemplateRef<any>;

  positions = Positions.data;
  constructor(
    public personalService: PersonalService,
    private toastService: ToastService
  ) {}

  ngAfterViewInit(): void {
    this.personalService.modalService.addDialogRef('person', this.modal);
  }

  onChangedList(value: any) {
    this.toastService.showToast('primary', `W liście wybrano pozycję ${value}`);
  }

  onChangedName(value: any) {
    this.toastService.showToast('primary', `Wpisano wartość ${value}`);
  }
}
