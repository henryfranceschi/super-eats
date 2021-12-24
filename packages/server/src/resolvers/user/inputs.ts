import { Equals, IsEmail, Length, Matches, MaxLength } from 'class-validator';
import { Field, InputType, registerEnumType } from 'type-graphql';
import { User, UserRole } from '../../entity/User';

@InputType()
class CreateUserInput implements Partial<User> {
    @Field()
    @MaxLength(254)
    @IsEmail()
    email: string;

    @Field()
    @Length(8, 64)
    password: string;

    @Field({ nullable: true })
    firstName?: string;

    @Field({ nullable: true })
    lastName?: string;
}

@InputType()
class LoginInput implements Partial<User> {
    @Field()
    email: string;

    @Field()
    password: string;
}

@InputType()
class PasswordUpdateInput {
    @Field()
    password: string;

    @Field()
    @Equals('password')
    confirmPassword: string;

    @Field()
    secret: string;
}

registerEnumType(UserRole, {
    name: 'UserRole',
    description: '',
});

export { CreateUserInput, LoginInput, PasswordUpdateInput };
