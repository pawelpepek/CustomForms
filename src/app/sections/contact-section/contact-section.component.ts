import { Component } from '@angular/core';
import { CodeBlock } from '../../components/code-tabs/CodeBlock';
import { ContactService } from '../../services/contact.service';
import { CONTACT_CODE_BLOCKS } from './ContactCodeBlocks';

@Component({
  selector: 'app-contact-section',
  templateUrl: `./contact-section.component.html`,
})
export class ContactSectionComponent {
  codeBlocks: CodeBlock[] = CONTACT_CODE_BLOCKS;

  constructor(public contactService: ContactService) {}

  get title(): string {
    return `${this.contactService.selectedItem.value?.firstName}
    ${this.contactService.selectedItem.value?.lastName}`;
  }
}
