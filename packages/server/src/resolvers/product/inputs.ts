import { IsPositive, Length, MaxLength } from 'class-validator';
import {
    ArgsType,
    Field,
    Float,
    InputType,
    registerEnumType,
} from 'type-graphql';
import Product, { Categories, Diets } from '../../entity/Product';

enum ProductOrder {
    Popularity = 'popularity',
    Rating = 'rating',
    Price = 'price',
}

@InputType()
class ProductCreateInput implements Partial<Product> {

    @Field()
    @Length(2, 32)
    name: string;

    @Field({ nullable: true })
    @MaxLength(64)
    description?: string;

    @Field(() => Float)
    @IsPositive()
    price: number;

    @Field(() => Categories)
    category: Categories;

    @Field(() => Diets, { nullable: true })
    diet?: Diets;

    @Field({ nullable: true })
    image?: string;

}
@InputType()
class ProductUpdateInput implements Partial<Product> {

    @Field({ nullable: true })
    @Length(2, 32)
    name?: string;

    @Field({ nullable: true })
    @MaxLength(64)
    description?: string;

    @Field(() => Float, { nullable: true })
    @IsPositive()
    price?: number;

    @Field(() => Categories, { nullable: true })
    category?: Categories;

    @Field(() => Diets, { nullable: true })
    diet?: Diets;

    @Field({ nullable: true })
    image?: string;

}

// const PartialProduct = PartialType(ProductCreateInput);
// export type ProductUpdateInput = typeof PartialProduct;


// @InputType()
// class ProductUpdateInput implements Omit<Product, 'id' | 'imageUri' | 'seller' | 'reviews' | 'averageRating'> {

// }

@ArgsType()
class ProductsArgs {
    @Field(() => Float, { nullable: true })
    minPrice?: number;

    @Field(() => Float, { nullable: true })
    maxPrice?: number;

    @Field(() => Float, { nullable: true })
    minRating?: number;

    @Field(() => Float, { nullable: true })
    maxRating?: number;
}

registerEnumType(Diets, {
    name: 'Diets',
    description: '',
});

registerEnumType(Categories, {
    name: 'Categories',
    description: '',
});

registerEnumType(ProductOrder, {
    name: 'ProductOrder',
    description: '',
});

export { ProductCreateInput, ProductUpdateInput, ProductsArgs, ProductOrder };
