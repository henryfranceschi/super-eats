import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { User } from './User';
import Restaurant from './Restaurant';
import { Field, Float, Int, ObjectType } from 'type-graphql';
import { Resource } from './Resource';

enum Diets {
    None,
    Vegetarian,
    Vegan,
    Halal,
}

enum Categories {
    None,
    American,
    Chinese,
    English,
    French,
    Indian,
    Korean,
    Mexican,
    Japanese,
    Vietnamese,
}

@ObjectType()
@Entity()
class Product extends Resource {
    @Field()
    @Column({ length: 32 })
    name: string;

    @Field({ nullable: true })
    @Column({ length: 64, nullable: true })
    description?: string;

    @Field(() => Float)
    @Column('float')
    price: number;

    @Field(() => Categories)
    @Column({
        type: 'enum',
        enum: Categories,
        default: Categories.None,
    })
    category: Categories;

    @Field(() => Diets)
    @Column({
        type: 'enum',
        enum: Diets,
        default: Diets.None,
    })
    diet: Diets;

    @Field()
    @Column({ default: '/image/product/default.png' })
    imageUri: string;

    @Field(() => Restaurant)
    @ManyToOne(() => Restaurant, (restaurant) => restaurant.products, {
        nullable: false,
    })
    seller: Restaurant;

    @Field(() => [Review])
    @OneToMany(() => Review, (reviews) => reviews.product)
    reviews: Review[];

    @Field(() => Float)
    averageRating: number;
}

@ObjectType()
@Entity()
class Review extends Resource {
    @Field(() => Int)
    @Column()
    rating: number;

    @Field()
    @Column({ length: 1024, nullable: true })
    text: string;

    @Field(() => User)
    @ManyToOne(() => User)
    user: User;

    @Field(() => Product)
    @ManyToOne(() => Product, (product) => product.reviews)
    product: Product;
}

export default Product;
export { Categories, Diets, Product, Review };
