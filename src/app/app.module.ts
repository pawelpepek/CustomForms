import { HttpClientModule } from '@angular/common/http';
import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HighlightModule } from 'ngx-highlightjs';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactFormComponent } from './sections/contact-section/contact-form/contact-form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductFormComponent } from './sections/product-section/product-form/product-form.component';
import { PersonalShowComponent } from './sections/personal-section/personal-form/personal-show/personal-show.component';
import { PersonalFormComponent } from './sections/personal-section/personal-form/personal-form.component';
import { ToDoSectionComponent } from './sections/todo-section/todo-section.component';
import { CountrySectionComponent } from './sections/coutry-section/country-section.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToDoFormComponent } from './sections/todo-section/todo-form/todo-form.component';
import { CountryFormComponent } from './sections/coutry-section/country-form/country-form.component';
import { ContactSectionComponent } from './sections/contact-section/contact-section.component';
import { PersonalSectionComponent } from './sections/personal-section/personal-section.component';
import { ProductSectionComponent } from './sections/product-section/product-section.component';
import { ComponentsModule } from './components/components.module';

@NgModule({
  declarations: [
    AppComponent,
    ContactFormComponent,
    ProductFormComponent,
    PersonalFormComponent,
    PersonalShowComponent,
    ToDoSectionComponent,
    CountrySectionComponent,
    ToDoFormComponent,
    CountryFormComponent,
    ContactSectionComponent,
    PersonalSectionComponent,
    ProductSectionComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    BrowserAnimationsModule,
    HighlightModule,
    ComponentsModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  static injector: Injector;
  constructor(injector: Injector) {
    AppModule.injector = injector;
  }
}
