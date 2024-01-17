import { BehaviorSubject, Observable, OperatorFunction, tap } from 'rxjs';
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

  public value = (row: T, column: string) => {
    const value = (row as any)[column];

    if (!!this.tableAliases) {
      const alias = this.tableAliases.find((a) => a?.value == column);
      if (!!alias && !!alias.map) {
        const convertedValue = alias.map.find((m) => m.value == value);
        return !!convertedValue ? convertedValue.text : `${value}`;
      }
    }
    return `${value}`;
  };
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

  protected abstract updateItem(item: T): Observable<any> | null;
  protected abstract addItem(item: T): Observable<any> | null;

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
      .subscribe((answer) => this.deleteExact(answer, row));
  }

  private deleteExact = (answer: boolean, row: T): void => {
    if (answer && !!this.deleteItemMethod) {
      this.loaded = true;
      this.deleteItemMethod(row).subscribe({
        next: (result) => this.deleteResult(result, row),
        error: this.finalizeError,
      });
    }
  };

  private deleteResult = (result: boolean, row: T): void => {
    if (result) {
      this.items.next(
        this.items.value.filter((item) => !IsObjectsEquals(row, item))
      );
      this.selectedItem.next(undefined);
      this.toastService.showToast('success', 'Dane zostały usunięte');
      this.loaded = false;
    } else {
      this.finalizeError();
    }
  };

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
      return this.addItem(data)?.pipe(this.tapError()) ?? null;
    }

    return this.finalizeError();
  };

  private update = (formData: any): Observable<any> | null => {
    const dataFromForm = formData as T;

    const item = !this.isAddMethod()
      ? dataFromForm
      : CopyObjectIntoObject(dataFromForm, this.selectedItem.value) ??
        dataFromForm;

    this.prepareItem(formData, item);
    if (this.isUpdateMethod()) {
      return this.updateItem(item)?.pipe(this.tapError()) ?? null;
    }

    return this.finalizeError();
  };

  protected finalizeSuccess(selectedItem: T): void {
    this.selectedItem.next(selectedItem);
    this.toastService.showToast('success', 'Dane zostały zapisane');
    this.loaded = false;
  }

  protected finalizeError = (response: any = undefined): null => {
    const message = `Wystąpił błąd. ${response?.message}`;

    this.toastService.showToast('danger', message.trim());
    this.loaded = false;
    return null;
  };

  private tapError = (): OperatorFunction<any, any> => {
    return (source: Observable<any>) =>
      source.pipe(
        tap({
          error: this.finalizeError,
        })
      );
  };
}
