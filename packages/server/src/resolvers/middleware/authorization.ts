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
            throw new Error('authorization required...');
        }
    };
}

function authorizeIfAuthenticated(): MiddlewareFn<AppContext> {
    return async ({ context }: ResolverData<AppContext>, next: NextFn) => {
        if (context.req.session.userID) {
            await next();
        } else {
            throw new Error('authentication required...');
        }
    };
}

function authorizeIfRoles(roles: UserRole[]): MiddlewareFn<AppContext> {
    return async ({ context }: ResolverData<AppContext>, next: NextFn) => {
        const { userRole } = context.req.session;

        if (roles.includes(userRole) || userRole == UserRole.Admin) {
            // Continue
            await next();
        } else {
            throw new Error('authorization required...');
        }
    };
}
function authorizeIfOwner<T extends Resource>(
    ResourceCls: ClassType<T>,
    field: KeysWhere<T, User | Promise<User>>
): MiddlewareClass<AppContext> {
    class Middleware implements MiddlewareInterface<AppContext> {
        @InjectRepository(ResourceCls)
        private readonly resourceRepository: Repository<T>;

        @InjectRepository(User)
        private readonly userRepository: Repository<User>;

        async use({ context, args }: ResolverData<AppContext>, next: NextFn) {
            const owner = await this.userRepository.findOne(
                context.req.session.userID
            );
            const object = await this.resourceRepository.findOne(args.id, {
                relations: [field as string],
            });

            if ((object[field as string] as User).id == owner.id) {
                // if (object[prop as string] == owner) {
                console.log(object);
                await next();
            } else {
                throw new Error('resource not owned');
            }
        }
    }

    return Middleware;
}

export {
    authorizeIf,
    authorizeIfAuthenticated,
    authorizeIfOwner,
    authorizeIfRoles,
};
