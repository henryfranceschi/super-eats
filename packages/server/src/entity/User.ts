import { Column, Entity } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { Resource } from './Resource';

enum UserRole {
    User = 'user',
    Seller = 'seller',
    Admin = 'admin',
}

@ObjectType()
@Entity()
class User extends Resource {

    @Field()
    @Column({ length: 254, unique: true })
    email: string;

    @Column({ length: 64 })
    password: string;

    @Field()
    @Column({
        length: 32,
        nullable: true,
    })
    firstName: string;

    @Field()
    @Column({
        length: 32,
        nullable: true,
    })
    lastName: string;

    @Column({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP'
    })
    registrationDate?: Date;

    @Column({
        type: 'timestamp',
        nullable: true
    })
    lastConnection?: Date;

    @Field()
    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.User,
    })
    role: UserRole;

}

export { UserRole, User };
