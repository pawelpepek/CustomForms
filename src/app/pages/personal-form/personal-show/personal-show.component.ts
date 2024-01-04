import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { PersonalService } from '../../../services/personal.service';
import { Person } from '../../../models/Person';

@Component({
  selector: 'app-personal-show',
  templateUrl: './personal-show.component.html',
})
export class PersonalShowComponent {
  person?: Person;

  constructor(personalService: PersonalService) {
    personalService.selectedItem.subscribe((person) => {
      this.person = person;
    });
  }
}
