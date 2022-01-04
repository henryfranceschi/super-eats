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
import { ifOwner, ifOwnerShallow, ifRoles } from '../middleware';
import { ResourceResolver } from '../resource/resolvers';
import { RestaurantCreateInput } from './inputs';

@Resolver(Restaurant)
class RestaurantResolver extends ResourceResolver(Restaurant) {
    // Dependencies
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>;

    @InjectRepository(User)
    private readonly userRepository: Repository<User>;

    @Query(() => Restaurant)
    @UseMiddleware(ifRoles([UserRole.Seller]))
    @UseMiddleware()
    async ownRestaurtant(@Ctx() context: AppContext): Promise<Restaurant> {
        const userId = context.req.session.userID;
        return this.resourceRepository.findOne({
            where: { user: { id: userId } },
        });
    }

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
    // @UseMiddleware(ifRoles([UserRole.Seller]))
    async createRestaurant(
        @Arg('data') { name }: RestaurantCreateInput,
        @Ctx() context: AppContext
    ): Promise<Restaurant> {
        const user = await this.userRepository.findOne(
            context.req.session.userID
        );
        const count = await this.resourceRepository.count({ where: { user } });
        if (count === 0) {
            user.role = UserRole.Seller;
            const restaurant = this.resourceRepository.create({
                name,
                user,
            });

            this.userRepository.save(user);
            return this.resourceRepository.save(restaurant);
        } else {
            throw new Error('Cannot create more than one restaurant per user.');
        }
    }

    @Mutation(() => String)
    @UseMiddleware(ifOwnerShallow(Restaurant, 'user'))
    async removeRestaurant(@Arg('id', () => ID) id: string): Promise<string> {
        const restaurant = await this.resourceRepository.findOne(id);

        return restaurant.id;
    }
}

export default RestaurantResolver;
