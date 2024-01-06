import { BehaviorSubject, Observable, Subject, first, tap } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormGroupBuilder, FormGroupSchema } from './models/FormGroupBuilder';
import { ToastService } from './toast/toast-service';
import { AppModule } from '../../app.module';
import { Alias } from './models/Alias';
import {
  CopyObjectIntoObject,
  IsObjectsEquals,
} from '../../helpers/Comparision';

export abstract class DataService<T> {
  protected myForm!: FormGroup;
  protected schema!: FormGroupSchema;

  public items = new BehaviorSubject<T[]>([]);
  public selectedItem = new BehaviorSubject<T | undefined>(undefined);
  public loaded = false;
  public tableAliases: Alias<string>[] = [];

  protected fetchInitMethod?: () => Observable<T | undefined>;
  protected fetchItemMethod?: (id: any) => Observable<T | undefined>;
  protected fetchItemsMethod?: () => Observable<T[]>;
  protected updateItemMethod?: (data: T) => Observable<boolean>;
  protected addItemMethod?: (data: T) => Observable<T>;
  protected deleteItemMethod?: (data: T) => Observable<boolean>;

  protected fb: FormBuilder;
  protected toastService: ToastService;

  public get form() {
    return this.myForm;
  }

  constructor() {
    this.fb = AppModule.injector.get(FormBuilder);
    this.toastService = AppModule.injector.get(ToastService);

    this.selectedItem.subscribe(this.loadSelected);
  }

  protected prepareItem(formData: any, item: T): void {}
  protected prepareForm(formData: any, item: T): void {}

  public value = (row: T, column: string) => `${(row as any)[column]}`;
  public columns = (): string[] => Object.keys(this.myForm.getRawValue());
  public saveVisible = (): boolean => !!this.updateItemMethod;
  public reset = (): void => this.myForm.reset();
  public clearSelection = () => this.selectedItem.next(undefined);
  public addButtonVisible = () =>
    !!this.addItemMethod && !!this.updateItemMethod;

  private loadSelected = (item: T | undefined) => {
    if (!this.myForm) return;

    if (!!item) {
      const value = item as object;
      this.prepareForm(value, item);
      this.myForm.patchValue(value);
    } else {
      this.myForm.reset();
    }
  };

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

  public save = (formData: any): Observable<any> | null => {
    this.loaded = true;

    return this.selectedItem.value == undefined && !!this.addItemMethod
      ? this.add(formData)
      : this.update(formData);
  };

  protected initSchema(schema: FormGroupSchema): void {
    this.schema = schema;
    this.myForm = new FormGroupBuilder(this.fb).build(this.schema);
  }

  private add = (formData: any): Observable<any> | null => {
    const data = formData as T;
    this.prepareItem(formData, data);

    if (!!this.addItemMethod) {
      return this.addItemMethod(formData).pipe(
        tap((res) => {
          if (res) {
            this.finalizeSuccess(res);
            this.items.next([...this.items.value, res]);
          }
        })
      );
    }

    return this.finalizeError();
  };

  private update = (formData: any): Observable<any> | null => {
    const dataFromForm = formData as T;

    const data = !this.addItemMethod
      ? dataFromForm
      : CopyObjectIntoObject(dataFromForm, this.selectedItem.value) ??
        dataFromForm;

    this.prepareItem(formData, data);
    if (!!this.updateItemMethod) {
      return this.updateItemMethod(formData).pipe(
        tap((res) => {
          if (res) {
            this.replaceSelectedItem(data);
            this.finalizeSuccess(data);
          }
        })
      );
    }

    return this.finalizeError();
  };

  private finalizeSuccess(selectedItem: T): void {
    this.selectedItem.next(selectedItem);
    this.toastService.showToast('success', 'Dane zostały zapisane');
    this.loaded = false;
  }

  private finalizeError(): null {
    this.toastService.showToast('danger', 'Dane nie zostały zapisane');
    this.loaded = false;
    return null;
  }

  private replaceSelectedItem(data: T) {
    const indexToReplace = this.items.value.findIndex((item) =>
      IsObjectsEquals(this.selectedItem.value, item)
    );

    if (indexToReplace >= 0) {
      const items = [...this.items.value];
      items[indexToReplace] = data;

      this.items.next(items);
    }
  }
}
