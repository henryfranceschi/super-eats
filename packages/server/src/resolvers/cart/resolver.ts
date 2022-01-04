import {
    Arg,
    Ctx,
    FieldResolver,
    ID,
    Int,
    Mutation,
    Query,
    Resolver,
    Root,
    UseMiddleware,
} from 'type-graphql';
import { ResourceResolver } from '../resource/resolvers';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { CartRow } from '../../entity/Cart';
import { User } from '../../entity/User';
import { ifAuthenticated, ifOwnerShallow } from '../middleware';
import AppContext from '../../context';
import { ResourceKey } from '../../entity/Resource';
import Product from '../../entity/Product';

const options = {
    getOne: {
        middleware: [ifOwnerShallow(CartRow, 'user')],
    },
};

// @Resolver()
// class CartResolver
//     extends ResourceResolver(Cart, options)
//     implements ResolverInterface<Cart>
// {
//     @InjectRepository(User)
//     protected readonly userRepository: Repository<User>;

//     @Query(() => Cart)
//     @UseMiddleware(authorizeIfAuthenticated())
//     async ownCart(@Ctx() context: AppContext): Promise<Cart> {
//         const userId = context.req.session.userID;
//         return this.resourceRepository
//             .createQueryBuilder('cart')
//             .innerJoinAndSelect('cart.user', 'user')
//             .where('user.id = :userId', { userId })
//             .getOne();
//     }

//     @FieldResolver(() => [User])
//     async items(@Root() parent: Cart): Promise<CartRow[]> {
//         return parent.items;
//     }

//     @FieldResolver(() => User)
//     @UseMiddleware(authorizeifOwnerShallow(Cart, 'user'))
//     async user(@Root() parent: Cart): Promise<User> {
//         return parent.user;
//     }
// }

@Resolver(CartRow)
class CartRowResolver extends ResourceResolver(CartRow, options) {
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>;

    @InjectRepository(User)
    private readonly userRepository: Repository<User>;

    @Query(() => [CartRow])
    @UseMiddleware(ifAuthenticated())
    async cart(@Ctx() context: AppContext): Promise<CartRow[] | null> {
        const userId = context.req.session.userID;

        return this.resourceRepository.find({
            where: { user: { id: userId } },
        });
    }

    @Mutation(() => CartRow)
    @UseMiddleware(ifAuthenticated())
    async addToCart(
        @Ctx() context: AppContext,
        @Arg('productId', () => ID) productId: ResourceKey,
        @Arg('quantity', () => Int) quantity: number
    ): Promise<CartRow> {
        const userId = context.req.session.userID;

        const row = await this.resourceRepository.findOne({
            where: {
                user: { id: userId },
                product: { id: productId },
            },
        });

        if (row) {
            // If product is alread in the users cart add to the quantity
            row.quantity += quantity;
            return this.resourceRepository.save(row);
        } else {
            // Otherwise add a new row
            const product = await this.productRepository.findOne(productId);
            const user = await this.userRepository.findOne(userId);
            const row = this.resourceRepository.create({
                quantity,
                product,
                user,
            });

            return this.resourceRepository.save(row);
        }
    }

    @Mutation(() => CartRow)
    @UseMiddleware(ifOwnerShallow(CartRow, 'user'))
    async updateCartQuantity(
        @Arg('id', () => ID) id: ResourceKey,
        @Arg('quantity', () => Int) quantity: number
    ): Promise<CartRow> {
        const row = await this.resourceRepository.findOne(id);

        row.quantity = quantity;

        return this.resourceRepository.save(row);
    }

    @Mutation(() => Boolean)
    @UseMiddleware(ifOwnerShallow(CartRow, 'user'))
    async removeFromCart(
        @Arg('id', () => ID) id: ResourceKey
    ): Promise<boolean> {
        const res = await this.resourceRepository.delete(id);
        return res.affected !== 0;
    }

    @FieldResolver(() => Product)
    @UseMiddleware(ifAuthenticated())
    async product(@Root() parent: CartRow): Promise<Product> {
        return parent.product;
    }
}

export { CartRowResolver };
