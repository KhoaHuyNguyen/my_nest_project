import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { ProductModel } from './product.model';

@Resolver()
export class ProductsResolver {
    constructor(private productService: ProductsService) {};

    @Query(() => ProductModel)
    async getProduct() {
        return this.productService.getAll();
    }
    
    @Query(() => ProductModel)
    async getOneProduct(@Args('id') id: number) {
        return this.productService.getOne(id);
    }

    @Mutation(() => ProductModel)
    async createProduct(@Args('name') name: string, @Args('image') image: string, @Args('price') price: number) {
        const params = {
            name: "name",
            image: "image",
            price: 12345
        }
        return this.productService.create(params);
    }

    @Mutation(() => ProductModel)
    async deleteProduct(@Args('id') id: number) {
        return this.productService.delete(id);
    }
}
