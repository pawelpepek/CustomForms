import { Component } from '@angular/core';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-country-page',
  templateUrl: `./country-page.component.html`,
})
export class CountryPageComponent {
  constructor(public service: CountryService) {}
}
