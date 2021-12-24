import {
    Column,
    Entity,
    JoinColumn,
    OneToMany,
    OneToOne,
} from 'typeorm';
import { Field, Int, ObjectType } from 'type-graphql';
import Product from './Product';
import { User } from './User';
import { Resource } from './Resource';

@ObjectType()
@Entity()
class Restaurant extends Resource {

    @Field()
    @Column({ length: 32 })
    name: string;

    @Field(() => Int)
    totalSales: number;

    @Field(() => [Product])
    @OneToMany(() => Product, (product) => product.seller)
    products: Product[];

    @OneToOne(() => User, { nullable: false })
    @JoinColumn()
    user: User;

}

export default Restaurant;
