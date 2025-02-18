import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
    constructor(private categoriesService: CategoriesService) {}

    @Get()
    async getAll() {
        const categories = await this.categoriesService.getAll();
        return { categories };
    }
}
