import { BehaviorSubject, Observable, Subject, first } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormGroupBuilder, FormGroupSchema } from './models/FormGroupBuilder';
import { ToastService } from './toast/toast-service';

export abstract class DataService<T> {
  protected myForm!: FormGroup;
  protected schema!: FormGroupSchema;

  items = new Subject<T[]>();
  selectedItem = new BehaviorSubject<T | undefined>(undefined);

  public loaded = false;

  protected fetchInitMethod?: () => Observable<T | undefined>;
  protected fetchItemMethod?: (id: any) => Observable<T | undefined>;
  protected fetchItemsMethod?: () => Observable<T[]>;
  protected updateItemMethod?: (data: T) => Observable<boolean>;
  protected addItemMethod?: (data: T) => Observable<T>;
  protected deleteItemMethod?: (data: T) => Observable<boolean>;

  constructor(private fb: FormBuilder, private toastService: ToastService) {
    this.selectedItem.subscribe((item) => {
      if (!this.myForm) return;
      if (!!item) {
        const value = item as object;
        this.myForm.patchValue(value);
      } else {
        this.myForm.reset();
      }
    });
  }

  public saveVisible = (): boolean => !!this.updateItemMethod;
  public reset = (): void => this.myForm.reset();

  protected initSchema(schema: FormGroupSchema): void {
    this.schema = schema;
    this.myForm = new FormGroupBuilder(this.fb).build(this.schema);
  }

  public get form() {
    return this.myForm;
  }

  public load(): void {
    if (!!this.fetchInitMethod || !!this.fetchItemsMethod) {
      this.loaded = true;
      if (!!this.fetchInitMethod) {
        this.fetchInitMethod().subscribe((res) => {
          this.selectedItem.next(res);
          this.loaded = false;
        });
      }
    }
  }

  public save = (formData: any): Observable<any> => {
    this.loaded = true;
    const data = formData as T;

    this.prepareItem(formData, data);
    if (!!this.updateItemMethod) {
      this.updateItemMethod(formData).subscribe((res) => {
        if (res) {
          this.selectedItem.next(data);
          this.toastService.showToast('success', 'Dane zostały zapisane');
          this.loaded = false;
        }
      });
    }

    return this.selectedItem.pipe(first());
  };

  protected abstract prepareItem(formData: any, data: T): void;
}
