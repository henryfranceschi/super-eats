import { Equals, IsEmail, Length, MaxLength } from 'class-validator';
import { Field, InputType, registerEnumType } from 'type-graphql';
import { User, UserRole } from '../../entity/User';

@InputType()
class SignUpInput implements Partial<User> {
    @Field()
    @MaxLength(254)
    @IsEmail()
    email: string;

    @Field()
    @Length(8, 64)
    password: string;

    @Field()
    @Equals('password', { message: "passwords must match" })
    confirmPassword: string;

    @Field({ nullable: true })
    firstName?: string;

    @Field({ nullable: true })
    lastName?: string;
}

@InputType()
class SignInInput implements Partial<User> {
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
    token: string;
}

registerEnumType(UserRole, {
    name: 'UserRole',
    description: '',
});

export { SignUpInput, SignInInput, PasswordUpdateInput };
