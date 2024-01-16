import { Component } from '@angular/core';
import { CodeBlock } from '../../components/code-tabs/CodeBlock';
import { ProductService } from '../../services/product.service';
import { PRODUCT_CODE_BLOCKS } from './ProductCodeBlocks';

@Component({
  selector: 'app-product-section',
  templateUrl: `./product-section.component.html`,
})
export class ProductSectionComponent {
  codeBlocks: CodeBlock[] = PRODUCT_CODE_BLOCKS;

  constructor(public productService: ProductService) {}
}
