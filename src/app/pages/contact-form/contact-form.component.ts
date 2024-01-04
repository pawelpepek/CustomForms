import {
  AfterViewInit,
  Component,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
})
export class ContactFormComponent implements AfterViewInit {
  @ViewChild('contact') modal!: TemplateRef<any>;

  constructor(public contactService: ContactService) {}
  ngAfterViewInit(): void {
    this.contactService.modalService.addDialogRef('contact', this.modal);
  }
}
