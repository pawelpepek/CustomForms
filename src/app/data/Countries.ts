import { Country } from '../models/Country';

export class Countries {
  public static get data(): Country[] {
    return [
      { id: 1, name: 'Polska', capital: 'Warszawa' },
      { id: 2, name: 'Czechy', capital: 'Praga' },
      { id: 3, name: 'Słowacja', capital: 'Bratysława' },
      { id: 4, name: 'Niemcy', capital: 'Berlin' },
    ];
  }
}
