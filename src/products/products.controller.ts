import { Body, Controller, Get, Param, Post, Put, Render } from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from 'src/auth.guard';
import { UseGuards } from '@nestjs/common';

export interface ProductParams {
  name: string,
  image: string,
  price: number,
}

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @UseGuards(AuthGuard)
  @Get('')
  @Render('product/index')
  public async getAll() {
    const products =  await this.productsService.getAll();
    return { products };
  }

  @Get('')
  public async getOne(id: number) {
    const product = await this.productsService.getOne(id);
    return product;
  }

  @UseGuards(AuthGuard)
  @Post('create')
  public async create(@Body() body: ProductParams) {
    const product = await this.productsService.create(body);
    return product;
  }

  @Put('update/:id')
  public async update(@Param('id') id: number, @Body() body: ProductParams) {
    const product = await this.productsService.update(body, id)
    return product;
  }
}
