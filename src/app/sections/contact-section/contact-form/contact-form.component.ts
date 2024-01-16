import { Component } from '@angular/core';
import { ContactService } from '../../../services/contact.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
})
export class ContactFormComponent {
  constructor(public contactService: ContactService) {}
}
