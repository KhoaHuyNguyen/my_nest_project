import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from '../categories/categories.entity';

@Entity('product')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name?: string;

  @Column()
  image?: string;

  @Column()
  price?: number;

  @ManyToOne(type => Category, category => category.products)
  category?: Category;
}
