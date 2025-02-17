import { Controller, Get, Render } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  @Render('product/index')
  async getAll() {
    const products =  await this.productsService.getAll();
    return { products };
  }
}
