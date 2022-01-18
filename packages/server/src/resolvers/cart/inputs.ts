import { IsInt, IsPositive, NotEquals } from "class-validator";
import { Field, ID, InputType } from "type-graphql";
import { ResourceKey } from "../../entity/Resource";

@InputType()
export class CartQuantityUpdateInput {

    @Field(() => ID)
    id: ResourceKey

    @Field()
    @IsInt()
    @IsPositive()
    @NotEquals(0)
    quantity: number;

}