import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
} from '@angular/forms';

export interface FormGroupSchema {
  [key: string]:
    | ((control: AbstractControl<any, any>) => ValidationErrors | null)[]
    | FormGroupSchema;
}

export class FormGroupBuilder {
  constructor(private fb: FormBuilder) {}

  public build(schema: FormGroupSchema) {
    const form = this.fb.group({});
    this.fillGroup(form, schema);
    return form;
  }

  private fillGroup(group: FormGroup, schema: FormGroupSchema) {
    for (const key in schema) {
      if (!schema.hasOwnProperty(key)) return;
      this.addControl(group, schema, key);
    }
  }
  private addControl(group: FormGroup, schema: FormGroupSchema, key: string) {
    if (Array.isArray(schema[key])) {
      group.addControl(key, this.fb.control('', schema[key]));
    } else {
      const newGroup = this.fb.group({});
      this.fillGroup(newGroup, schema[key] as FormGroupSchema);
      group.addControl(key, newGroup);
    }
  }
}
