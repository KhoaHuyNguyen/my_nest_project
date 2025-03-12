import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './products.entity';
import { Repository } from 'typeorm';
import { ProductParams } from './products.controller';
import { ProductModel } from './product.model';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  async getAll(): Promise<Product[]> {
    const products = await this.productRepository.find();
    return products;
  }

  async getOne(id: number): Promise<Product | null>{
    const product = await this.productRepository.findOneBy({id}); 
    return product;
  }

  public create(product: ProductModel) {
    return this.productRepository.save(product);
  }

  public async update(params: ProductParams, id: number) {
    const product = await this.productRepository.findOne(
      {
      where: {
        id,
      }
    });
    console.log(product);
    product.name = params.name;
    product.image = params.image;
    product.price = params.price;
    return this.productRepository.save(product);
  }

  async delete(id: number) {
    const product = await this.productRepository.findOne({where: {id}});
    this.productRepository.delete({id});
    return product;
  }
}
