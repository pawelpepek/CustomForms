import { Alias } from '../components/forms/models/Alias';

export class TodoAliases {
  public static get data(): Alias<string>[] {
    return [
      { value: 'description', text: 'Opis' },
      { value: 'priority', text: 'Priorytet' },
    ];
  }
}
