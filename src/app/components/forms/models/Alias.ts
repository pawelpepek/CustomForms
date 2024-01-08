export interface Alias<T> {
  value: T;
  text: string;
  map?:{ value: any; text: any } [];
}
