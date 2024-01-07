import { BehaviorSubject, Observable } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  FormGroupBuilder,
  FormGroupSchema,
} from '../../components/forms/models/FormGroupBuilder';
import { ToastService } from '../../components/forms/toast/toast-service';
import { AppModule } from '../../app.module';
import { Alias } from '../../components/forms/models/Alias';
import {
  CopyObjectIntoObject,
  IsObjectsEquals,
} from '../../helpers/Comparision';
import { ConfirmService } from '../confirm.service';

export abstract class DataServiceBase<T> {
  protected myForm!: FormGroup;
  protected schema!: FormGroupSchema;

  public items = new BehaviorSubject<T[]>([]);
  public selectedItem = new BehaviorSubject<T | undefined>(undefined);
  public loaded = false;
  public tableAliases: Alias<string>[] = [];

  protected fetchInitMethod?: () => Observable<T | undefined>;
  protected fetchItemMethod?: (id: any) => Observable<T | undefined>;
  protected fetchItemsMethod?: () => Observable<T[]>;

  protected deleteItemMethod?: (data: T) => Observable<boolean>;

  private fb: FormBuilder;
  private toastService: ToastService;
  private confirmService: ConfirmService;

  public get form() {
    return this.myForm;
  }

  constructor() {
    this.fb = AppModule.injector.get(FormBuilder);
    this.toastService = AppModule.injector.get(ToastService);
    this.confirmService = AppModule.injector.get(ConfirmService);
    this.selectedItem.subscribe(this.loadSelected);
  }

  protected prepareItem(formData: any, item: T): void {}
  protected prepareForm(formData: any, item: T): void {}

  public value = (row: T, column: string) => `${(row as any)[column]}`;
  public columns = (): string[] => Object.keys(this.myForm.getRawValue());
  public reset = (): void => this.myForm.reset();
  public clearSelection = () => this.selectedItem.next(undefined);

  public saveVisible = (): boolean => this.isUpdateMethod();
  public addButtonVisible = () => this.isAddMethod() && this.isUpdateMethod;
  public deleteButtonVisible = () => !!this.deleteItemMethod;
  public addNewButtonDisabled = () => !this.selectedItem.value;
  public saveButtonText = () =>
    !!this.selectedItem.value || !this.isAddMethod()
      ? 'Zapisz zmiany'
      : 'Zapisz nowy';

  protected abstract isAddMethod(): boolean;
  protected abstract isUpdateMethod(): boolean;

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
      if (!!this.fetchItemsMethod) {
        this.fetchItemsMethod().subscribe((items) => {
          this.items.next(items);
          this.loaded = false;
        });
      }
    }
  }

  public delete(row: T): void {
    this.confirmService
      .showModal('Czy na pewno usunąć zaznaczoną pozycję?')
      .subscribe((answer) => {
        if (answer && !!this.deleteItemMethod) {
          this.loaded = true;
          this.deleteItemMethod(row).subscribe((res) => {
            if (res) {
              this.items.next(
                this.items.value.filter((item) => !IsObjectsEquals(row, item))
              );
              this.selectedItem.next(undefined);
              this.toastService.showToast('success', 'Dane zostały usunięte');
              this.loaded = false;
            } else {
              this.finalizeError();
            }
          });
        }
      });
  }

  public save = (formData: any): Observable<any> | null => {
    this.loaded = true;

    return this.selectedItem.value == undefined && this.isAddMethod()
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

    if (this.isAddMethod()) {
      return this.addItem(data);
    }

    return this.finalizeError();
  };

  protected abstract addItem(item: T): Observable<any> | null;

  private update = (formData: any): Observable<any> | null => {
    const dataFromForm = formData as T;

    const item = !this.isAddMethod()
      ? dataFromForm
      : CopyObjectIntoObject(dataFromForm, this.selectedItem.value) ??
        dataFromForm;

    this.prepareItem(formData, item);
    if (this.isUpdateMethod()) {
      return this.updateItem(item);
    }

    return this.finalizeError();
  };

  protected abstract updateItem(item: T): Observable<any> | null;

  protected finalizeSuccess(selectedItem: T): void {
    this.selectedItem.next(selectedItem);
    this.toastService.showToast('success', 'Dane zostały zapisane');
    this.loaded = false;
  }

  private finalizeError(): null {
    this.toastService.showToast('danger', 'Dane nie zostały zapisane');
    this.loaded = false;
    return null;
  }

  protected replaceSelectedItem(data: T | undefined) {
    const indexToReplace = this.items.value.findIndex((item) =>
      IsObjectsEquals(this.selectedItem.value, item)
    );

    if (indexToReplace >= 0) {
      const items = [...this.items.value];
      if (!!data) items[indexToReplace] = data;

      this.items.next(items);
    }
  }
}
