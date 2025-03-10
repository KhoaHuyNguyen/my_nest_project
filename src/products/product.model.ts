import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Product } from './products.entity';

@ObjectType()
export class ProductModel {
  @Field(type => Int)
  id: number;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  image: string;

  @Field(type => Int)
  price: number;
}