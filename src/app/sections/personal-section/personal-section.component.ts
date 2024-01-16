import { Component } from '@angular/core';
import { CodeBlock } from '../../components/code-tabs/CodeBlock';
import { PersonalService } from '../../services/personal.service';
import { PERSONAL_CODE_BLOCKS } from './PersonalCodeBlocks';

@Component({
  selector: 'app-personal-section',
  templateUrl: `./personal-section.component.html`,
})
export class PersonalSectionComponent {
  codeBlocks: CodeBlock[] = PERSONAL_CODE_BLOCKS;

  constructor(public personalService: PersonalService) {}

  get title(): string {
    return `${this.personalService.selectedItem.value?.firstName}
    ${this.personalService.selectedItem.value?.lastName}`;
  }
}
