import { Field, ID, ObjectType } from 'type-graphql';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';

export type ResourceKey = string;

@ObjectType()
@Entity()
export abstract class Resource {
    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: ResourceKey;
}
