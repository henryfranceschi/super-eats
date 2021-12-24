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
@ObjectType()
@Entity()
class Cart extends Resource {

    @Field(() => [CartItem])
    @OneToMany(() => CartItem, (cartItem) => cartItem.cart)
    items: CartItem[];

    @Field(() => User)
    @OneToOne(() => User)
    user: User;

    @Field(() => Boolean)
    current: boolean;

}

// Represents a 'row' in a user's cart
@ObjectType()
@Entity()
class CartItem extends Resource {

    @Field(() => Float)
    @Column('decimal', { precision: 5, scale: 2 })
    price: number;

    @Field(() => Int)
    @Column('int')
    count: number;

    @Field(() => Product)
    @OneToOne(() => Product)
    @JoinColumn()
    product: Product;

    @Field(() => Cart)
    @ManyToOne(() => Cart, (cart) => cart.items)
    cart: Cart;

}

export { Cart, CartItem };
