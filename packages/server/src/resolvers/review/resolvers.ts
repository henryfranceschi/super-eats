import {
    Arg,
    Ctx,
    FieldResolver,
    Mutation,
    Resolver,
    ResolverInterface,
    Root,
} from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import AppContext from '../../context';
import Product, { Review } from '../../entity/Product';
import { User } from '../../entity/User';
import { ResourceResolver } from '../resource/resolvers';
import { ReviewCreateInput } from './inputs';

@Resolver(Review)
class ReviewResolver
    extends ResourceResolver(Review)
    implements ResolverInterface<Review>
{
    // Dependencies
    @InjectRepository(User)
    private readonly userRepository: Repository<User>;

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>;

    // Queries
    @Mutation(() => Review)
    async createReview(
        @Arg('data') { rating, text, productID }: ReviewCreateInput,
        @Ctx() context: AppContext
    ): Promise<Review> {
        const product = await this.productRepository.findOne(productID);
        const user = await this.userRepository.findOne(
            context.req.session.userID
        );

        const review = this.resourceRepository.create({
            rating,
            text,
            user,
            product,
        });

        return this.resourceRepository.save(review);
    }

    @FieldResolver(() => User)
    async user(@Root() parent: Review): Promise<User> {
        const { user } = await this.resourceRepository.findOne(parent.id, {
            relations: ['user'],
        });
        return user;
    }
}

export default ReviewResolver;
