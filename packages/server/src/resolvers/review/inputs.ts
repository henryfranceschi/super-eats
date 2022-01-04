import { Field, InputType, Int } from 'type-graphql';
import { Review } from '../../entity/Product';
import { ResourceKey } from '../../entity/Resource';

@InputType()
class ReviewCreateInput implements Partial<Review> {
    @Field(() => Int)
    rating: number;

    @Field()
    text: string;

    @Field(() => Int)
    productID: ResourceKey;
}

export { ReviewCreateInput };
