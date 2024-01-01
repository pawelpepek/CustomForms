import { Observable, Subject, first } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormGroupBuilder, FormGroupSchema } from './models/FormGroupBuilder';

export abstract class DataService<T> {
  protected myForm!: FormGroup;
  protected schema!: FormGroupSchema;

  data = new Subject<T>();

  constructor(private fb: FormBuilder) {}

  protected initSchema(schema: FormGroupSchema) {
    this.schema = schema;
    this.myForm = new FormGroupBuilder(this.fb).build(this.schema);
  }

  public get form() {
    return this.myForm;
  }

  public save = (formData: any): Observable<any> => {
    setTimeout(() => {
      const data = formData as T;
      this.prepareData(formData, data);

      this.data.next(data);
    }, 300);

    return this.data.pipe(first());
  };

  protected abstract prepareData(formData: any, data: T): void;
}
