import { Middleware } from 'type-graphql/dist/interfaces/Middleware';
import AppContext from '../../context';
import { KeyMap } from '../../utility';

export interface IResourceResolver<T> {
    getOne?: ResolverFunction<T | null>;
    getMany?: ResolverFunction<T>;
}

export type ResolverClassOptions<T> = KeyMap<
    IResourceResolver<T>,
    ResolverOptions
>;

type ResolverFunction<T> = (...args: unknown[]) => T | Promise<T>;

type ResolverOptions = {
    name?: string;
    description?: string;
    middleware?: Array<Middleware<AppContext>>;
};
