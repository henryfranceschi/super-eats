import { IsEmail, Length, MaxLength } from "class-validator";
import { Field, InputType, registerEnumType } from "type-graphql";
import { User, UserRole } from '../../entity/User';

@InputType()
class CreateUserInput implements Partial<User> {

    @Field()
    @MaxLength(254)
    @IsEmail()
    email: string;

    @Field()
    @Length(5, 64)
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

registerEnumType(UserRole, {
    name: 'UserRole',
    description: ''
})

export { CreateUserInput, LoginInput }