import {
    Arg,
    Args,
    FieldResolver,
    Float,
    Int,
    Mutation,
    Query,
    Resolver,
    ResolverInterface,
    Root,
} from 'type-graphql';
import Product, { Review } from '../../entity/Product';
import { CreateProductInput, ProductOrder } from './inputs';
import { Order } from '../inputs';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Repository } from 'typeorm';
import { PaginationArgs } from '../resource/input';
import { ResourceResolver } from '../resource/resolvers';
import { ResourceKey } from '../../entity/Resource';

@Resolver(Product)
class ProductResolver
    extends ResourceResolver(Product)
    implements ResolverInterface<Product>
{
    // Dependencies
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>;

    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>;

    // Queries
    @Query(() => Product)
    async product(
        @Arg('id', () => Int) id: ResourceKey
    ): Promise<Product | null> {
        return this.productRepository.findOne(id);
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
        const queryBuilder = this.productRepository
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
    async createProduct(
        @Arg('data') data: CreateProductInput
    ): Promise<Product> {
        const product = this.productRepository.create(data);
        return this.productRepository.save(product);
    }

    @Mutation(() => [Product])
    async createProducts(
        @Arg('data', () => [CreateProductInput])
        data: CreateProductInput[]
    ): Promise<Product[]> {
        const promises = this.productRepository
            .create(data)
            .map(async (product) => this.productRepository.save(product));

        return Promise.all(promises);
    }

    @FieldResolver(() => Float)
    async averageRating(@Root() parent: Product): Promise<number> {
        const avg: number = await this.productRepository
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
