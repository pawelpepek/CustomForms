import { HttpClientModule } from '@angular/common/http';
import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactFormComponent } from './pages/contact-form/contact-form.component';
import { CustomFormsModule } from './components/forms/form.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductFormComponent } from './pages/product-form/product-form.component';
import { CardComponent } from './components/card/card.component';
import { PersonalShowComponent } from './pages/personal-form/personal-show/personal-show.component';
import { PersonalFormComponent } from './pages/personal-form/personal-form.component';
import { ToDoFormComponent } from './pages/todo-page/todo-form/todo-form.component';
import { ToDoPageComponent } from './pages/todo-page/todo-page.component';
import { TableComponent } from './components/table/table.component';
import { ToDoTableComponent } from './pages/todo-page/todo-table/todo-table.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactFormComponent,
    ProductFormComponent,
    CardComponent,
    PersonalFormComponent,
    PersonalShowComponent,
    ToDoFormComponent,
    ToDoPageComponent,
    TableComponent,
    ToDoTableComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CustomFormsModule,
    NgbModule,
  ],
  exports: [
    ContactFormComponent,
    ContactFormComponent,
    ProductFormComponent,
    ToDoFormComponent,
    ToDoPageComponent,
    TableComponent,
    ToDoTableComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  static injector: Injector;
  constructor(injector: Injector) {
    AppModule.injector = injector;
  }
}
