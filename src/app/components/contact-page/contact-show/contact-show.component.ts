import { Component } from '@angular/core';
import { ContactService } from '../../../services/contact.service';
import { Contact } from '../../../models/Contact';

@Component({
  selector: 'app-contact-show',
  templateUrl: './contact-show.component.html',
})
export class ContactShowComponent {
  contact?: Contact;

  constructor(contactService: ContactService) {
    contactService.data.subscribe((contact) => {
      this.contact = contact;
    });
  }
}
