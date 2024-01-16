import { Component } from '@angular/core';
import { CountryService } from '../../../services/country.service';

@Component({
  selector: 'app-country-form',
  templateUrl: './country-form.component.html',
})
export class CountryFormComponent {
  constructor(public service: CountryService) {}
}
