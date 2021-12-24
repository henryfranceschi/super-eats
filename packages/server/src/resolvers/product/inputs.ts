import { IsPositive, Length, MaxLength } from 'class-validator';
import {
    ArgsType,
    Field,
    Float,
    InputType,
    Int,
    registerEnumType,
} from 'type-graphql';
import Product, { Categories, Diets } from '../../entity/Product';

enum ProductOrder {
    Popularity,
    Rating,
    Price,
}

@InputType()
class CreateProductInput implements Partial<Product> {
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
}

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

export { CreateProductInput, ProductsArgs, ProductOrder };
