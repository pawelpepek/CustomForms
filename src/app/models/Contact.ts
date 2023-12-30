export interface Contact {
  firstName: string;
  lastName: string;
  email: string;
  position: Position;
  address: Address;
}

export interface Address {
  zip: string;
  city: string;
  street: string;
}

export interface Position {
  value: number;
  text: string;
}
