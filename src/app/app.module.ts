import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactFormComponent } from './pages/contact-page/contact-form/contact-form.component';
import { CustomFormsModule } from './components/core/forms/form.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { ContactShowComponent } from './pages/contact-page/contact-show/contact-show.component';
import { ProductFormComponent } from './pages/product-page/product-form/product-form.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { CardComponent } from './components/core/card/card.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactFormComponent,
    ContactPageComponent,
    ContactShowComponent,
    ProductFormComponent,
    ProductPageComponent,
    CardComponent
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
    ContactPageComponent,
    ContactShowComponent,
    ProductFormComponent,
    ProductPageComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
