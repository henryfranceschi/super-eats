/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
    Arg,
    Args,
    ClassType,
    ID,
    Query,
    Resolver,
    UseMiddleware,
} from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Resource, ResourceKey } from '../../entity/Resource';
import { PaginationArgs } from './input';
import { ResolverClassOptions } from './types';

function ResourceResolver<T extends Resource>(
    ResourceCls: ClassType<T>,
    options?: ResolverClassOptions<T>
) {
    const resourceName = ResourceCls.name.toLocaleLowerCase();

    @Resolver(() => ResourceCls, { isAbstract: true })
    abstract class ResourceResolverClass {
        constructor(
            @InjectRepository(ResourceCls)
            protected readonly resourceRepository: Repository<T>
        ) {}

        @Query(() => ResourceCls, {
            name: options?.getOne?.name ?? resourceName,
        })
        @UseMiddleware(options?.getOne?.middleware)
        async getOne(@Arg('id', () => ID) id: ResourceKey): Promise<T | null> {
            return this.resourceRepository.findOne(id);
        }

        @Query(() => ResourceCls, {
            name: options?.getMany?.name ?? `${resourceName}s`,
        })
        @UseMiddleware(options?.getMany?.middleware)
        async getMany(@Args() { skip, take }: PaginationArgs): Promise<T[]> {
            return this.resourceRepository.find({ skip, take });
        }
    }

    return ResourceResolverClass;
}

function constructName(parts: string[]) {
    return parts
        .map((elem, idx) => {
            const firstChar =
                idx > 0
                    ? elem.charAt(0).toLocaleUpperCase()
                    : elem.charAt(0).toLocaleLowerCase();

            return firstChar.concat(elem.slice(1));
        })
        .reduce((previous, current) => previous.concat(current));
}

export { ResourceResolver };
