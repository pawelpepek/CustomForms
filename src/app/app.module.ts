import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactFormComponent } from './components/contact-page/contact-form/contact-form.component';
import { CustomFormsModule } from './components/core/forms/form.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ContactPageComponent } from './components/contact-page/contact-page.component';
import { ContactShowComponent } from './components/contact-page/contact-show/contact-show.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactFormComponent,
    ContactPageComponent,
    ContactShowComponent,
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
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
