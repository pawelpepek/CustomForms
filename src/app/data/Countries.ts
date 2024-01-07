import { Country } from "../models/Country";

export class Countries {
  public static get data(): Country[] {
    return [{ id: 1, name: 'Polska', capital: 'Warszawa' }];
  }
}
