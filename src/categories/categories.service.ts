import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './categories.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
    constructor(@InjectRepository(Category) private categoryRepository: Repository<Category>) {}

    async getAll(): Promise<Category[]> {
        const categories = await this.categoryRepository.find();
        return categories 
    }

    async getOne(id: number): Promise<Category | null> {
        const category = await this.categoryRepository.findOneBy({id});
        return category;
    }

    public create(): Promise<Category> {
        const category = new Category();
        return this.categoryRepository.save(category);
    }

    async delete(id: number): Promise<void> {
        const remove = await this.categoryRepository.delete({id});
    }
}
