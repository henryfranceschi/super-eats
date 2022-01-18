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
import { PasswordUpdateInput, SignInInput, SignUpInput } from './inputs';
import AppContext from '../../context';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Repository } from 'typeorm';
import { authorizeIf, ifAuthenticated, ifRoles } from '../middleware';
import { ResourceResolver } from '../resource/resolvers';
import { ownProfile } from './middleware';

const options = {
    getOne: { middleware: [ownProfile] },
    getMany: { middleware: [ifRoles([UserRole.Admin])] },
};

@Resolver(User)
class UserResolver extends ResourceResolver(User, options) {
    // Dependencies
    // @InjectRepository(User)
    // private readonly userRepository: Repository<User>;

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
    //     return this.resourceRepository.findOne(id);
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

    @Query(() => User, { nullable: true })
    async currentUser(@Ctx() context: AppContext): Promise<User | null> {
        const userId = context.req.session.userID;
        if (userId) {
            return this.resourceRepository.findOne(userId);
        } else {
            return null;
        }
    }

    @Mutation(() => User)
    async signUp(
        @Arg('data') { email, password, firstName, lastName }: SignUpInput
    ): Promise<User> {
        const hashedPassword = await bcrypt.hash(password, 10);

        const count = await this.resourceRepository.count({ where: { email } });

        if (count == 0) {
            const user = this.resourceRepository.create({
                email,
                password: hashedPassword,
                firstName,
                lastName,
            });
            return this.resourceRepository.save(user);
        } else {
            throw new Error('That email is already in use.');
        }
    }

    @Mutation(() => User)
    async signIn(
        @Arg('data') { email, password }: SignInInput,
        @Ctx() context: AppContext
    ): Promise<User> {
        const user = await this.resourceRepository.findOne({
            where: { email },
        });

        if (user) {
            if (await bcrypt.compare(password, user.password)) {
                context.req.session.userID = user.id;
                context.req.session.userRole = user.role;
                return user;
            }
        }

        throw new Error('Username/password incorrect.');
    }

    @Mutation(() => Boolean)
    signOut(@Ctx() context: AppContext): boolean {
        context.req.session.destroy((err) => {
            if (err) console.error(err);
        });

        return true;
    }

    @Mutation(() => Boolean)
    async forgotPassword(
        @Ctx() context: AppContext,
        @Arg('email') email: string
    ): Promise<boolean> {
        const user = await this.resourceRepository.findOne({
            where: { email },
        });

        if (user) {
            // Send email
            const token = crypto.randomBytes(64).toString('hex');
            context.req.session.passwordResetToken = token;
            console.log(`token: ${token}`);
        }

        return true;
    }

    @Query(() => Boolean)
    validatePasswordResetToken(
        @Ctx() context: AppContext,
        @Arg('token') token: string
    ): boolean {
        if (token === context.req.session.passwordResetToken) {
            return true;
        } else {
            return false;
        }
    }

    @Mutation(() => Boolean)
    async updatePassword(
        @Ctx() context: AppContext,
        @Arg('data') { password, token }: PasswordUpdateInput
    ): Promise<boolean> {
        const user = await this.resourceRepository.findOne(
            context.req.session.userID
        );

        return true;
    }
}

export default UserResolver;
