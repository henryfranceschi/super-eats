import {
    Arg,
    Args,
    Ctx,
    FieldResolver,
    Float,
    ID,
    Mutation,
    Query,
    Resolver,
    ResolverInterface,
    Root,
    UseMiddleware,
} from 'type-graphql';
import Product, { Review } from '../../entity/Product';
import { ProductCreateInput, ProductOrder, ProductUpdateInput } from './inputs';
import { Order } from '../inputs';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Repository, UpdateResult } from 'typeorm';
import { PaginationArgs } from '../resource/input';
import { ResourceResolver } from '../resource/resolvers';
import { ResourceKey } from '../../entity/Resource';
import Restaurant from '../../entity/Restaurant';
import AppContext from '../../context';
import { ifOwner, ifRoles } from '../middleware';
import { UserRole } from '../../entity/User';

@Resolver(Product)
class ProductResolver
    extends ResourceResolver(Product)
    implements ResolverInterface<Product>
{
    // Dependencies
    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>;

    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>;

    @Query(() => Product)
    async product(@Arg('id', () => ID) id: ResourceKey): Promise<Product> {
        return this.resourceRepository.findOne(id);
    }

    @Query(() => [Product])
    async products(
        @Args() { skip, take }: PaginationArgs,
        @Arg('orderBy', () => ProductOrder, {
            nullable: true,
            defaultValue: ProductOrder.Rating,
        })
        orderBy: ProductOrder,
        @Arg('direction', () => Order, { defaultValue: Order.Asc })
        direction: Order
    ): Promise<Product[]> {
        const queryBuilder = this.resourceRepository
            .createQueryBuilder('product')
            .select('product.*');

        switch (orderBy) {
            case ProductOrder.Popularity:
                // Order by number of sales
                return queryBuilder.getRawMany();
                break;

            case ProductOrder.Price:
                queryBuilder.orderBy('price', direction);
                break;

            case ProductOrder.Rating:
                queryBuilder
                    .addSelect('AVG(review.rating)', 'avg')
                    .leftJoin('product.reviews', 'review')
                    .orderBy('avg', direction);
                break;
        }

        if (take) {
            queryBuilder.take(take);
        }

        if (skip) {
            queryBuilder.skip(skip);
        }

        return queryBuilder.groupBy('product.id').getRawMany();
    }

    @Mutation(() => Product)
    @UseMiddleware(ifRoles([UserRole.Seller]))
    async createProduct(
        @Ctx() context: AppContext,
        @Arg('data') data: ProductCreateInput
    ): Promise<Product> {
        const seller = await this.restaurantRepository.findOne({
            where: {
                user: {
                    id: context.req.session.userID,
                },
            },
        });

        console.log(seller);

        const product = this.resourceRepository.create({ ...data, seller });
        return this.resourceRepository.save(product);
    }

    @Mutation(() => [Product])
    @UseMiddleware(ifRoles([UserRole.Seller]))
    async createProducts(
        @Ctx() context: AppContext,
        @Arg('data', () => [ProductCreateInput])
        data: ProductCreateInput[]
    ): Promise<Product[]> {
        const seller = await this.restaurantRepository.findOne({
            where: {
                user: {
                    id: context.req.session.userID,
                },
            },
        });

        data.forEach((object) => Object.assign(object, { seller }));

        return this.resourceRepository.save(
            this.resourceRepository.create(data)
        );
    }

    @Mutation(() => Boolean)
    @UseMiddleware(ifOwner(Product, ['seller', 'user']))
    async updateProduct(
        @Arg('id', () => ID) id: ResourceKey,
        @Arg('data') data: ProductUpdateInput
    ): Promise<boolean> {
        type DataType = ProductUpdateInput;
        type KeyValuePair = [k: string, v: DataType[keyof DataType]];
        const updatedValues = Object.entries(data)
            .filter(([_, value]: KeyValuePair) => value !== undefined)
            .reduce(
                (obj, [key, value]: KeyValuePair) =>
                    Object.assign(obj, { [key]: value }),
                {}
            );

        const result: UpdateResult = await this.resourceRepository.update(id, {
            ...updatedValues,
        });
        if (result.affected > 0) {
            return true;
        } else {
            return false;
        }
    }

    @Mutation(() => ID)
    @UseMiddleware(ifOwner(Product, ['seller', 'user']))
    async deleteProduct(
        @Arg('id', () => ID) id: ResourceKey
    ): Promise<ResourceKey> {
        const result = await this.resourceRepository.delete(id);

        console.assert(result.affected > 0);

        return id;
    }

    @FieldResolver(() => Float)
    async averageRating(@Root() parent: Product): Promise<number> {
        const avg: number = await this.reviewRepository
            .createQueryBuilder('review')
            .select('AVG(review.rating)', 'avg')
            .where({
                product: parent,
            })
            .getRawOne();

        return avg ?? 0;
    }

    @FieldResolver(() => [Review])
    async reviews(@Root() parent: Product): Promise<Review[]> {
        return this.reviewRepository.find({
            where: {
                product: parent,
            },
        });
    }
}

export default ProductResolver;
