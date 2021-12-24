import { ArgsType, Field, Int } from "type-graphql";

@ArgsType()
class PaginationArgs {
    @Field(() => Int, { nullable: true })
    skip?: number;

    @Field(() => Int, { nullable: true })
    take?: number;
}

export { PaginationArgs };