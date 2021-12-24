import {
    Arg,
    Ctx,
    FieldResolver,
    ID,
    Mutation,
    Query,
    Resolver,
    Root,
    UseMiddleware,
} from 'type-graphql';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import AppContext from '../../context';
import Product from '../../entity/Product';
import Restaurant from '../../entity/Restaurant';
import { User, UserRole } from '../../entity/User';
import { authorizeIfOwner, authorizeIfRoles } from '../middleware';
import { ResourceResolver } from '../resource/resolvers';
import { RestaurantCreateInput } from './inputs';

@Resolver(Restaurant)
class RestaurantResolver extends ResourceResolver(Restaurant) {
    // Dependencies
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>;

    @InjectRepository(User)
    private readonly userRepository: Repository<User>;

    // Queries
    @Query(() => [Restaurant])
    async restaurants(
        @Arg('nameContains', { nullable: true }) nameContains: string
    ): Promise<Restaurant[]> {
        if (nameContains) {
            return this.resourceRepository.find({
                name: Like(`%${nameContains}%`),
            });
        } else {
            return this.resourceRepository.find();
        }
    }

    @FieldResolver(() => [Product])
    async products(@Root() parent: Restaurant): Promise<Product[]> {
        return this.productRepository.find({
            where: { seller: parent },
            relations: ['seller'],
        });
    }

    @Mutation(() => Restaurant)
    @UseMiddleware(authorizeIfRoles([UserRole.Seller]))
    async createRestaurant(
        @Arg('data') { name }: RestaurantCreateInput,
        @Ctx() context: AppContext
    ): Promise<Restaurant> {
        const user = await this.userRepository.findOne(
            context.req.session.userID
        );
        const restaurant = this.resourceRepository.create({
            name,
            user,
        });

        return this.resourceRepository.save(restaurant);
    }

    @Mutation(() => String)
    @UseMiddleware(authorizeIfOwner(Restaurant, 'user'))
    async removeRestaurant(@Arg('id', () => ID) id: string): Promise<string> {
        const restaurant = await this.resourceRepository.findOne(id);

        return restaurant.id;
    }
}

export default RestaurantResolver;
