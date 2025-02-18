import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './products.entity';
import { Repository } from 'typeorm';

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

  public create() {
    const product = new Product();
    return this.productRepository.save(product);
  }

  async delete(id: number): Promise<void>{
    const remove = await this.productRepository.delete(id);
  }
}
