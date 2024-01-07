import { Alias } from '../components/forms/models/Alias';

export class CountryAliases {
  public static get data(): Alias<string>[] {
    return [
      { value: 'name', text: 'Nazwa' },
      { value: 'capital', text: 'Stolica' },
    ];
  }
}