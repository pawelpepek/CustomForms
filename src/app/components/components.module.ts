import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HighlightModule } from 'ngx-highlightjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CardComponent } from './card/card.component';
import { CustomFormsModule } from './forms/form.module';
import { MatTabsModule } from '@angular/material/tabs';
import { CodeTabsComponent } from './code-tabs/code-tabs.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CodeComponent } from './code-tabs/code/code.component';
import { HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { SectionTemplateComponent } from './section-template/section-template.component';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [
    CardComponent,
    CodeTabsComponent,
    CodeComponent,
    SectionTemplateComponent,
    ModalComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    CustomFormsModule,
    MatTabsModule,
    BrowserAnimationsModule,
    HighlightModule,
  ],
  exports: [
    SectionTemplateComponent,
    ModalComponent,
    CustomFormsModule,
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
})
export class ComponentsModule {}
