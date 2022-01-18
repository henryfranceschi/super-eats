import { ArgsDictionary, ClassType, ResolverData } from 'type-graphql';
import { MiddlewareFn, MiddlewareInterface, NextFn } from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import AppContext from '../../context';
import { User, UserRole } from '../../entity/User';
import { Resource } from '../../entity/Resource';
import { MiddlewareClass } from 'type-graphql/dist/interfaces/Middleware';
import { KeysWhere } from '../../utility';

function authorizeIf(
    condition: (args: ArgsDictionary, context: AppContext) => boolean
): MiddlewareFn<AppContext> {
    return async (
        { args, context }: ResolverData<AppContext>,
        next: NextFn
    ) => {
        if (condition(args, context)) {
            // Continue
            await next();
        } else {
            throw new Error('Authorization required.');
        }
    };
}

function ifAuthenticated(): MiddlewareFn<AppContext> {
    return async (
        {
            context: {
                req: {
                    session: { userID },
                },
            },
        }: ResolverData<AppContext>,
        next: NextFn
    ) => {
        if (userID) {
            await next();
        } else {
            throw new Error('Authentication required.');
        }
    };
}

function ifRoles(roles: UserRole[]): MiddlewareFn<AppContext> {
    return async ({ context }: ResolverData<AppContext>, next: NextFn) => {
        const { userRole } = context.req.session;
        if (userRole) {
            if (roles.includes(userRole) || userRole === UserRole.Admin) {
                await next();
                return;
            }
        }

        throw new Error('Authorization required.');
    };
}

function ifOwnerShallow<T extends Resource>(
    ResourceCls: ClassType<T>,
    field: KeysWhere<T, User | Promise<User>>
): MiddlewareClass<AppContext> {
    class Middleware implements MiddlewareInterface<AppContext> {
        @InjectRepository(ResourceCls)
        private readonly resourceRepository!: Repository<T>;

        @InjectRepository(User)
        private readonly userRepository!: Repository<User>;

        async use({ context, args }: ResolverData<AppContext>, next: NextFn) {
            const { userID, userRole } = context.req.session;
            if (userID && userRole) {
                if (userRole === UserRole.Admin) {
                    await next();
                } else {
                    const currentUser = await this.userRepository.findOne(
                        userID
                    );

                    const relationName = field as string;

                    const object = await this.resourceRepository.findOne(
                        args.id,
                        {
                            relations: [relationName],
                        }
                    );

                    const user = object[relationName] as User;

                    if (user?.id == currentUser.id) {
                        await next();
                    } else {
                        throw new Error('Resource not owned.');
                    }
                }
            } else {
                throw new Error('Resource not owned.');
            }
        }
    }

    return Middleware;
}

function ifOwner<T extends Resource>(
    ResourceCls: ClassType<T>,
    fields: string[]
): MiddlewareClass<AppContext> {
    class Middleware implements MiddlewareInterface<AppContext> {
        @InjectRepository(ResourceCls)
        private readonly resourceRepository: Repository<T>;

        @InjectRepository(User)
        private readonly userRepository: Repository<User>;

        async use({ context, args }: ResolverData<AppContext>, next: NextFn) {
            const { userID, userRole } = context.req.session;
            if (userID && userRole) {
                if (userRole === UserRole.Admin) {
                    await next();
                    return;
                } else {
                    const user = await this.userRepository.findOne(userID);

                    const relationNames = fields.map((_, idx, array) =>
                        array.slice(0, idx + 1).join('.')
                    );

                    const object = await this.resourceRepository.findOne(
                        args.id,
                        {
                            relations: relationNames,
                        }
                    );

                    const owner = fields.reduce((object, key) => {
                        return object[key];
                    }, object) as User;

                    if (owner.id == user.id) {
                        await next();
                        return;
                    }
                }
            }
            throw new Error('Resource not owned.');
        }
    }

    return Middleware;
}

export { authorizeIf, ifAuthenticated, ifOwnerShallow, ifOwner, ifRoles };
