import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
} from 'typeorm';
import { ObjectType, Field, Int, Float } from 'type-graphql';
import { Product } from './Product';
import { User } from './User';
import { Resource } from './Resource';

// Represents the current contents of a user's cart
// @ObjectType()
// @Entity()
// class Cart extends Resource {
//     @Field(() => [CartRow])
//     @OneToMany(() => CartRow, (CartRow) => CartRow.cart)
//     items: Promise<CartRow[]>;

//     @Field(() => User)
//     @OneToOne(() => User)
//     user: Promise<User>;

//     @Field(() => Boolean)
//     current: boolean;
// }

// Represents a 'row' in a user's cart
@ObjectType()
@Entity()
class CartRow extends Resource {
    // @Field(() => Float)
    // @Column('decimal', { precision: 5, scale: 2 })
    // price: number;

    @Field(() => Int)
    @Column('int')
    quantity: number;

    @Field(() => Product, { nullable: false })
    @ManyToOne(() => Product, {
        nullable: false,
        eager: true,
        onDelete: 'CASCADE',
    })
    product: Product;

    @Field(() => User, { nullable: false })
    @ManyToOne(() => User, { nullable: false })
    user: User;
}

export { CartRow };
