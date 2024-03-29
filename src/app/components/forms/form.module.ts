import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './form.component';
import { ButtonComponent } from './button/button.component';
import { InputComponent } from './inputs/input/input.component';
import { SelectComponent } from './inputs/select/select.component';
import { InputBaseComponent } from './inputs/Input-base/input-base.component';
import { InputWrapperComponent } from './inputs/Input-base/input-wraper.component';
import { ToastsContainer } from './toast/toasts-container.component';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { NgTemplateOutlet } from '@angular/common';
import { TableComponent } from './table/table.component';
import { DeleteButtonComponent } from './table/delete-button/delete-button.component';
import { ConfirmComponent } from './confirm/confirm.component';

@NgModule({
  declarations: [
    FormComponent,
    ButtonComponent,
    InputComponent,
    SelectComponent,
    InputBaseComponent,
    InputWrapperComponent,
    ToastsContainer,
    TableComponent,
    DeleteButtonComponent,
    ConfirmComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    NgbToastModule,
    NgTemplateOutlet,
  ],
  exports: [
    FormComponent,
    ButtonComponent,
    InputComponent,
    SelectComponent,
    TableComponent,
    ConfirmComponent,
  ],
  providers: [],
})
export class CustomFormsModule {}
