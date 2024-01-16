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
import { CardComponent } from './components/card/card.component';
import { PersonalShowComponent } from './sections/personal-section/personal-form/personal-show/personal-show.component';
import { PersonalFormComponent } from './sections/personal-section/personal-form/personal-form.component';
import { ToDoSectionComponent } from './sections/todo-section/todo-section.component';
import { CustomFormsModule } from './components/forms/form.module';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { CountrySectionComponent } from './sections/coutry-section/country-section.component';
import { MatTabsModule } from '@angular/material/tabs';
import { CodeTabsComponent } from './components/code-tabs/code-tabs.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CodeComponent } from './components/code-tabs/code/code.component';
import { HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { SectionTemplateComponent } from './components/section-template/section-template.component';
import { ToDoFormComponent } from './sections/todo-section/todo-form/todo-form.component';
import { CountryFormComponent } from './sections/coutry-section/country-form/country-form.component';
import { ContactSectionComponent } from './sections/contact-section/contact-section.component';
import { ModalComponent } from './components/modal/modal.component';
import { PersonalSectionComponent } from './sections/personal-section/personal-section.component';
import { ProductSectionComponent } from './sections/product-section/product-section.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactFormComponent,
    ProductFormComponent,
    CardComponent,
    PersonalFormComponent,
    PersonalShowComponent,
    ToDoSectionComponent,
    ConfirmComponent,
    CountrySectionComponent,
    CodeTabsComponent,
    CodeComponent,
    SectionTemplateComponent,
    ToDoFormComponent,
    CountryFormComponent,
    ContactSectionComponent,
    ModalComponent,
    PersonalSectionComponent,
    ProductSectionComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    CustomFormsModule,
    MatTabsModule,
    BrowserAnimationsModule,
    HighlightModule,
  ],
  exports: [
    ContactFormComponent,
    ContactFormComponent,
    ProductFormComponent,
    ToDoSectionComponent,
    CountrySectionComponent,
    CodeTabsComponent,
    CodeComponent,
    SectionTemplateComponent,
    ToDoFormComponent,
    CountryFormComponent,
    ContactSectionComponent,
    ModalComponent,
    PersonalSectionComponent,
    ProductSectionComponent
  ],
  providers: [
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        coreLibraryLoader: () => import('highlight.js/lib/core'),
        lineNumbersLoader: () => import('ngx-highlightjs/line-numbers'), // Optional, only if you want the line numbers
        languages: {
          typescript: () => import('highlight.js/lib/languages/typescript'),
          css: () => import('highlight.js/lib/languages/css'),
          xml: () => import('highlight.js/lib/languages/xml'),
        },
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  static injector: Injector;
  constructor(injector: Injector) {
    AppModule.injector = injector;
  }
}
