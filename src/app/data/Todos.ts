import { ToDo } from '../models/ToDo';

export class Todos {
  public static get data(): ToDo[] {
    return [
      { id: 1, description: 'Wstać z łóżka', priority: 3 },
      { id: 2, description: 'Zjeść śniadanie', priority: 2 },
      { id: 3, description: 'Pobiegać', priority: 1 },
      { id: 4, description: 'Iść spać', priority: 3 },
    ];
  }
}
