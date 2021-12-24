import crypto from 'crypto';
import {
    Arg,
    Ctx,
    Int,
    MiddlewareFn,
    Mutation,
    Query,
    Resolver,
    UseMiddleware,
} from 'type-graphql';
import bcrypt from 'bcrypt';
import { User, UserRole } from '../../entity/User';
import { CreateUserInput, LoginInput, PasswordUpdateInput } from './inputs';
import AppContext from '../../context';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Repository } from 'typeorm';
import {
    authorizeIf,
    authorizeIfAuthenticated,
    authorizeIfRoles,
} from '../middleware';
import { ResourceResolver } from '../resource/resolvers';
import { ownProfile } from './middleware';

const options = {
    getOne: { middleware: [ownProfile] },
    getMany: { middleware: [authorizeIfRoles([UserRole.Admin])] },
};

@Resolver(User)
class UserResolver extends ResourceResolver(User, options) {
    // Dependencies
    @InjectRepository(User)
    private readonly userRepository: Repository<User>;

    // constructor(
    //     @InjectRepository(User)
    //     private readonly userRepository: Repository<User>
    // ) {}

    // @Query(() => User)
    // @UseMiddleware(
    //     authorization((args, context) => {
    //         const { userID, userRole } = context.req.session;
    //         return userID === args.id || userRole === UserRole.Admin;
    //     })
    // )
    // async user(@Arg('id', () => Int) id: number): Promise<User> {
    //     return this.userRepository.findOne(id);
    // }

    // @Query(() => [User])
    // @UseMiddleware(
    //     authorization((args, context) => {
    //         const { userRole } = context.req.session;
    //         return userRole === UserRole.Admin;
    //     })
    // )
    // async users(): Promise<User[]> {
    //     return this.userRepository.find();
    // }

    @Query(() => User)
    @UseMiddleware(authorizeIfAuthenticated())
    async currentUser(@Ctx() context: AppContext): Promise<User> {
        return this.userRepository.findOne(context.req.session.userID);
    }

    @Mutation(() => User)
    async createUser(
        @Arg('data') { email, password, firstName, lastName }: CreateUserInput
    ): Promise<User> {
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = this.userRepository.create({
            email,
            password: hashedPassword,
            firstName,
            lastName,
        });

        return this.userRepository.save(user);
    }

    @Mutation(() => User)
    async login(
        @Arg('data') { email, password }: LoginInput,
        @Ctx() context: AppContext
    ): Promise<User> {
        const user = await this.userRepository.findOne({ where: { email } });

        if (user) {
            if (await bcrypt.compare(password, user.password)) {
                context.req.session.userID = user.id;
                return user;
            }
        }

        throw new Error('Username/password incorrect');
    }

    @Mutation(() => Boolean)
    async forgotPassword(@Arg('email') email: string) {
        const user = await this.userRepository.findOne({ where: { email } });

        if (user) {
            // Send email
        } else {
            throw new Error(
                'If an account exists with that email address an email will be sent to reset your password.'
            );
        }

        return true;
    }

    @Mutation(() => Boolean)
    async updatePassword(
        @Ctx() context: AppContext,
        @Arg('data') { password }: PasswordUpdateInput
    ): Promise<boolean> {
        const user = await this.userRepository.findOne(
            context.req.session.userID
        );

        return true;
    }

    @Mutation(() => Boolean)
    logout(@Ctx() context: AppContext): boolean {
        context.req.session.destroy((err) => {
            if (err) console.error(err);
        });

        return true;
    }
}

export default UserResolver;
