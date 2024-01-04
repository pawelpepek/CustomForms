import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactFormComponent } from './pages/contact-form/contact-form.component';
import { CustomFormsModule } from './components/core/forms/form.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductFormComponent } from './pages/product-form/product-form.component';
import { CardComponent } from './components/core/card/card.component';
import { PersonalShowComponent } from './pages/personal-form/personal-show/personal-show.component';
import { PersonalFormComponent } from './pages/personal-form/personal-form.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactFormComponent,
    ProductFormComponent,
    CardComponent,
    PersonalFormComponent,
    PersonalShowComponent,
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
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
