/**
 * Create a union of all keys of T where type is U
 */
export type KeysWhere<T, U> = {
    [K in keyof T]: T[K] extends U ? K : never;
}[keyof T];

/**
 * Create a type which has the same keys as T where the type is U
 */
export type KeyMap<T, U> = {
    -readonly [K in keyof T]: U;
};
