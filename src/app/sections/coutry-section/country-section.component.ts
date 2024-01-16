import { Component } from '@angular/core';
import { CodeBlock } from '../../components/code-tabs/CodeBlock';
import { COUNTRY_CODE_BLOCKS } from './CountryCodeBlocks';

@Component({
  selector: 'app-country-section',
  templateUrl: `./country-section.component.html`,
})
export class CountrySectionComponent {
  codeBlocks: CodeBlock[] = COUNTRY_CODE_BLOCKS;
}
