import { Address } from "./Address";
import { Contact } from "./Contact";

export interface Person extends Contact{
    position: Position;
    address: Address;
  }
  
  export interface Position {
    value: number;
    text: string;
  }
  