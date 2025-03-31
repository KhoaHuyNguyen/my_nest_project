import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './products.entity';
import { Repository } from 'typeorm';
import { ProductParams } from './products.controller';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  private readonly logger = new Logger(ProductsService.name);

  async getAll(): Promise<Product[]> {
    const products = await this.productRepository.find();
    return products;
  }

  async getOne(id: number): Promise<Product | null>{
    const product = await this.productRepository.findOneBy({id}); 
    return product;
  }

  public create(product: ProductParams) {
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

  // @Cron('30 * * * * *')
  // handleCron() {
  //   this.logger.debug('Called every 30');
  // }
}
