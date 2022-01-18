import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type CartRow = {
  __typename?: 'CartRow';
  id: Scalars['ID'];
  product: Product;
  quantity: Scalars['Int'];
  user: User;
};

export enum Categories {
  American = 'American',
  Chinese = 'Chinese',
  English = 'English',
  French = 'French',
  Indian = 'Indian',
  Japanese = 'Japanese',
  Korean = 'Korean',
  Mexican = 'Mexican',
  None = 'None',
  Vietnamese = 'Vietnamese'
}

export enum Diets {
  Halal = 'Halal',
  None = 'None',
  Vegan = 'Vegan',
  Vegetarian = 'Vegetarian'
}

export type Mutation = {
  __typename?: 'Mutation';
  addToCart: CartRow;
  createProduct: Product;
  createProducts: Array<Product>;
  createRestaurant: Restaurant;
  createReview: Review;
  deleteProduct: Scalars['ID'];
  forgotPassword: Scalars['Boolean'];
  removeFromCart: Scalars['Boolean'];
  removeRestaurant: Scalars['String'];
  signIn: User;
  signOut: Scalars['Boolean'];
  signUp: User;
  updateCartQuantity: CartRow;
  updatePassword: Scalars['Boolean'];
  updateProduct: Scalars['Boolean'];
};


export type MutationAddToCartArgs = {
  productId: Scalars['ID'];
  quantity: Scalars['Int'];
};


export type MutationCreateProductArgs = {
  data: ProductCreateInput;
};


export type MutationCreateProductsArgs = {
  data: Array<ProductCreateInput>;
};


export type MutationCreateRestaurantArgs = {
  data: RestaurantCreateInput;
};


export type MutationCreateReviewArgs = {
  data: ReviewCreateInput;
};


export type MutationDeleteProductArgs = {
  id: Scalars['ID'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationRemoveFromCartArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveRestaurantArgs = {
  id: Scalars['ID'];
};


export type MutationSignInArgs = {
  data: SignInInput;
};


export type MutationSignUpArgs = {
  data: SignUpInput;
};


export type MutationUpdateCartQuantityArgs = {
  id: Scalars['ID'];
  quantity: Scalars['Int'];
};


export type MutationUpdatePasswordArgs = {
  data: PasswordUpdateInput;
};


export type MutationUpdateProductArgs = {
  data: ProductUpdateInput;
  id: Scalars['ID'];
};

export enum Order {
  Asc = 'Asc',
  Desc = 'Desc'
}

export type PasswordUpdateInput = {
  confirmPassword: Scalars['String'];
  password: Scalars['String'];
  token: Scalars['String'];
};

export type Product = {
  __typename?: 'Product';
  averageRating: Scalars['Float'];
  category: Categories;
  description?: Maybe<Scalars['String']>;
  diet: Diets;
  id: Scalars['ID'];
  imageUri: Scalars['String'];
  name: Scalars['String'];
  price: Scalars['Float'];
  reviews: Array<Review>;
  seller: Restaurant;
};

export type ProductCreateInput = {
  category: Categories;
  description?: InputMaybe<Scalars['String']>;
  diet?: InputMaybe<Diets>;
  image?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  price: Scalars['Float'];
};

export enum ProductOrder {
  Popularity = 'Popularity',
  Price = 'Price',
  Rating = 'Rating'
}

export type ProductUpdateInput = {
  category?: InputMaybe<Categories>;
  description?: InputMaybe<Scalars['String']>;
  diet?: InputMaybe<Diets>;
  image?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  price?: InputMaybe<Scalars['Float']>;
};

export type Query = {
  __typename?: 'Query';
  cart: Array<CartRow>;
  cartrow: CartRow;
  cartrows: CartRow;
  currentUser?: Maybe<User>;
  ownRestaurtant: Restaurant;
  product: Product;
  products: Array<Product>;
  restaurant: Restaurant;
  restaurants: Array<Restaurant>;
  review: Review;
  reviews: Review;
  user: User;
  users: User;
  validatePasswordResetToken: Scalars['Boolean'];
};


export type QueryCartrowArgs = {
  id: Scalars['ID'];
};


export type QueryCartrowsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};


export type QueryProductArgs = {
  id: Scalars['ID'];
};


export type QueryProductsArgs = {
  direction?: InputMaybe<Order>;
  orderBy?: InputMaybe<ProductOrder>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};


export type QueryRestaurantArgs = {
  id: Scalars['ID'];
};


export type QueryRestaurantsArgs = {
  nameContains?: InputMaybe<Scalars['String']>;
};


export type QueryReviewArgs = {
  id: Scalars['ID'];
};


export type QueryReviewsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};


export type QueryUsersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};


export type QueryValidatePasswordResetTokenArgs = {
  token: Scalars['String'];
};

export type Restaurant = {
  __typename?: 'Restaurant';
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  imageUri: Scalars['String'];
  name: Scalars['String'];
  products: Array<Product>;
  totalSales: Scalars['Int'];
};

export type RestaurantCreateInput = {
  name: Scalars['String'];
};

export type Review = {
  __typename?: 'Review';
  id: Scalars['ID'];
  product: Product;
  rating: Scalars['Int'];
  text: Scalars['String'];
  user: User;
};

export type ReviewCreateInput = {
  productID: Scalars['Int'];
  rating: Scalars['Int'];
  text: Scalars['String'];
};

export type SignInInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type SignUpInput = {
  confirmPassword: Scalars['String'];
  email: Scalars['String'];
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['ID'];
  lastName: Scalars['String'];
  role: Scalars['String'];
};

export type AddToCartMutationVariables = Exact<{
  productId: Scalars['ID'];
  quantity: Scalars['Int'];
}>;


export type AddToCartMutation = { __typename?: 'Mutation', addToCart: { __typename?: 'CartRow', id: string } };

export type RemoveFromCartMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type RemoveFromCartMutation = { __typename?: 'Mutation', removeFromCart: boolean };

export type UpdateCartQuantityMutationVariables = Exact<{
  id: Scalars['ID'];
  quantity: Scalars['Int'];
}>;


export type UpdateCartQuantityMutation = { __typename?: 'Mutation', updateCartQuantity: { __typename?: 'CartRow', id: string } };

export type CreateRestaurantMutationVariables = Exact<{
  data: RestaurantCreateInput;
}>;


export type CreateRestaurantMutation = { __typename?: 'Mutation', createRestaurant: { __typename?: 'Restaurant', id: string } };

export type CreateProductMutationVariables = Exact<{
  data: ProductCreateInput;
}>;


export type CreateProductMutation = { __typename?: 'Mutation', createProduct: { __typename?: 'Product', id: string } };

export type DeleteProductMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteProductMutation = { __typename?: 'Mutation', deleteProduct: string };

export type UpdateProductMutationVariables = Exact<{
  id: Scalars['ID'];
  data: ProductUpdateInput;
}>;


export type UpdateProductMutation = { __typename?: 'Mutation', updateProduct: boolean };

export type SignInMutationVariables = Exact<{
  data: SignInInput;
}>;


export type SignInMutation = { __typename?: 'Mutation', signIn: { __typename?: 'User', id: string } };

export type SignOutMutationVariables = Exact<{ [key: string]: never; }>;


export type SignOutMutation = { __typename?: 'Mutation', signOut: boolean };

export type SignUpMutationVariables = Exact<{
  data: SignUpInput;
}>;


export type SignUpMutation = { __typename?: 'Mutation', signUp: { __typename?: 'User', id: string } };

export type CartItemsQueryVariables = Exact<{ [key: string]: never; }>;


export type CartItemsQuery = { __typename?: 'Query', cart: Array<{ __typename?: 'CartRow', id: string, quantity: number, product: { __typename?: 'Product', id: string, name: string, imageUri: string, price: number } }> };

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { __typename?: 'Query', currentUser?: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, role: string } | null | undefined };

export type OwnRestaurtantQueryVariables = Exact<{ [key: string]: never; }>;


export type OwnRestaurtantQuery = { __typename?: 'Query', ownRestaurtant: { __typename?: 'Restaurant', id: string, name: string, description?: string | null | undefined, products: Array<{ __typename?: 'Product', id: string, name: string, description?: string | null | undefined, price: number, category: Categories, diet: Diets, imageUri: string }> } };

export type ProductQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ProductQuery = { __typename?: 'Query', product: { __typename?: 'Product', name: string, description?: string | null | undefined, price: number, category: Categories, diet: Diets } };

export type ProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type ProductsQuery = { __typename?: 'Query', products: Array<{ __typename?: 'Product', id: string, name: string, description?: string | null | undefined, price: number, imageUri: string }> };

export type RestaurantProductsQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type RestaurantProductsQuery = { __typename?: 'Query', restaurant: { __typename?: 'Restaurant', name: string, description?: string | null | undefined, products: Array<{ __typename?: 'Product', name: string, description?: string | null | undefined }> } };

export type RestaurantsQueryVariables = Exact<{ [key: string]: never; }>;


export type RestaurantsQuery = { __typename?: 'Query', restaurants: Array<{ __typename?: 'Restaurant', id: string, name: string, description?: string | null | undefined }> };

export type UserQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type UserQuery = { __typename?: 'Query', user: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, role: string } };


export const AddToCartDocument = gql`
    mutation AddToCart($productId: ID!, $quantity: Int!) {
  addToCart(productId: $productId, quantity: $quantity) {
    id
  }
}
    `;
export type AddToCartMutationFn = Apollo.MutationFunction<AddToCartMutation, AddToCartMutationVariables>;

/**
 * __useAddToCartMutation__
 *
 * To run a mutation, you first call `useAddToCartMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddToCartMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addToCartMutation, { data, loading, error }] = useAddToCartMutation({
 *   variables: {
 *      productId: // value for 'productId'
 *      quantity: // value for 'quantity'
 *   },
 * });
 */
export function useAddToCartMutation(baseOptions?: Apollo.MutationHookOptions<AddToCartMutation, AddToCartMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddToCartMutation, AddToCartMutationVariables>(AddToCartDocument, options);
      }
export type AddToCartMutationHookResult = ReturnType<typeof useAddToCartMutation>;
export type AddToCartMutationResult = Apollo.MutationResult<AddToCartMutation>;
export type AddToCartMutationOptions = Apollo.BaseMutationOptions<AddToCartMutation, AddToCartMutationVariables>;
export const RemoveFromCartDocument = gql`
    mutation removeFromCart($id: ID!) {
  removeFromCart(id: $id)
}
    `;
export type RemoveFromCartMutationFn = Apollo.MutationFunction<RemoveFromCartMutation, RemoveFromCartMutationVariables>;

/**
 * __useRemoveFromCartMutation__
 *
 * To run a mutation, you first call `useRemoveFromCartMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveFromCartMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeFromCartMutation, { data, loading, error }] = useRemoveFromCartMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveFromCartMutation(baseOptions?: Apollo.MutationHookOptions<RemoveFromCartMutation, RemoveFromCartMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveFromCartMutation, RemoveFromCartMutationVariables>(RemoveFromCartDocument, options);
      }
export type RemoveFromCartMutationHookResult = ReturnType<typeof useRemoveFromCartMutation>;
export type RemoveFromCartMutationResult = Apollo.MutationResult<RemoveFromCartMutation>;
export type RemoveFromCartMutationOptions = Apollo.BaseMutationOptions<RemoveFromCartMutation, RemoveFromCartMutationVariables>;
export const UpdateCartQuantityDocument = gql`
    mutation UpdateCartQuantity($id: ID!, $quantity: Int!) {
  updateCartQuantity(id: $id, quantity: $quantity) {
    id
  }
}
    `;
export type UpdateCartQuantityMutationFn = Apollo.MutationFunction<UpdateCartQuantityMutation, UpdateCartQuantityMutationVariables>;

/**
 * __useUpdateCartQuantityMutation__
 *
 * To run a mutation, you first call `useUpdateCartQuantityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCartQuantityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCartQuantityMutation, { data, loading, error }] = useUpdateCartQuantityMutation({
 *   variables: {
 *      id: // value for 'id'
 *      quantity: // value for 'quantity'
 *   },
 * });
 */
export function useUpdateCartQuantityMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCartQuantityMutation, UpdateCartQuantityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCartQuantityMutation, UpdateCartQuantityMutationVariables>(UpdateCartQuantityDocument, options);
      }
export type UpdateCartQuantityMutationHookResult = ReturnType<typeof useUpdateCartQuantityMutation>;
export type UpdateCartQuantityMutationResult = Apollo.MutationResult<UpdateCartQuantityMutation>;
export type UpdateCartQuantityMutationOptions = Apollo.BaseMutationOptions<UpdateCartQuantityMutation, UpdateCartQuantityMutationVariables>;
export const CreateRestaurantDocument = gql`
    mutation CreateRestaurant($data: RestaurantCreateInput!) {
  createRestaurant(data: $data) {
    id
  }
}
    `;
export type CreateRestaurantMutationFn = Apollo.MutationFunction<CreateRestaurantMutation, CreateRestaurantMutationVariables>;

/**
 * __useCreateRestaurantMutation__
 *
 * To run a mutation, you first call `useCreateRestaurantMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRestaurantMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRestaurantMutation, { data, loading, error }] = useCreateRestaurantMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateRestaurantMutation(baseOptions?: Apollo.MutationHookOptions<CreateRestaurantMutation, CreateRestaurantMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateRestaurantMutation, CreateRestaurantMutationVariables>(CreateRestaurantDocument, options);
      }
export type CreateRestaurantMutationHookResult = ReturnType<typeof useCreateRestaurantMutation>;
export type CreateRestaurantMutationResult = Apollo.MutationResult<CreateRestaurantMutation>;
export type CreateRestaurantMutationOptions = Apollo.BaseMutationOptions<CreateRestaurantMutation, CreateRestaurantMutationVariables>;
export const CreateProductDocument = gql`
    mutation CreateProduct($data: ProductCreateInput!) {
  createProduct(data: $data) {
    id
  }
}
    `;
export type CreateProductMutationFn = Apollo.MutationFunction<CreateProductMutation, CreateProductMutationVariables>;

/**
 * __useCreateProductMutation__
 *
 * To run a mutation, you first call `useCreateProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProductMutation, { data, loading, error }] = useCreateProductMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateProductMutation(baseOptions?: Apollo.MutationHookOptions<CreateProductMutation, CreateProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProductMutation, CreateProductMutationVariables>(CreateProductDocument, options);
      }
export type CreateProductMutationHookResult = ReturnType<typeof useCreateProductMutation>;
export type CreateProductMutationResult = Apollo.MutationResult<CreateProductMutation>;
export type CreateProductMutationOptions = Apollo.BaseMutationOptions<CreateProductMutation, CreateProductMutationVariables>;
export const DeleteProductDocument = gql`
    mutation DeleteProduct($id: ID!) {
  deleteProduct(id: $id)
}
    `;
export type DeleteProductMutationFn = Apollo.MutationFunction<DeleteProductMutation, DeleteProductMutationVariables>;

/**
 * __useDeleteProductMutation__
 *
 * To run a mutation, you first call `useDeleteProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProductMutation, { data, loading, error }] = useDeleteProductMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteProductMutation(baseOptions?: Apollo.MutationHookOptions<DeleteProductMutation, DeleteProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteProductMutation, DeleteProductMutationVariables>(DeleteProductDocument, options);
      }
export type DeleteProductMutationHookResult = ReturnType<typeof useDeleteProductMutation>;
export type DeleteProductMutationResult = Apollo.MutationResult<DeleteProductMutation>;
export type DeleteProductMutationOptions = Apollo.BaseMutationOptions<DeleteProductMutation, DeleteProductMutationVariables>;
export const UpdateProductDocument = gql`
    mutation UpdateProduct($id: ID!, $data: ProductUpdateInput!) {
  updateProduct(id: $id, data: $data)
}
    `;
export type UpdateProductMutationFn = Apollo.MutationFunction<UpdateProductMutation, UpdateProductMutationVariables>;

/**
 * __useUpdateProductMutation__
 *
 * To run a mutation, you first call `useUpdateProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProductMutation, { data, loading, error }] = useUpdateProductMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateProductMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProductMutation, UpdateProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProductMutation, UpdateProductMutationVariables>(UpdateProductDocument, options);
      }
export type UpdateProductMutationHookResult = ReturnType<typeof useUpdateProductMutation>;
export type UpdateProductMutationResult = Apollo.MutationResult<UpdateProductMutation>;
export type UpdateProductMutationOptions = Apollo.BaseMutationOptions<UpdateProductMutation, UpdateProductMutationVariables>;
export const SignInDocument = gql`
    mutation SignIn($data: SignInInput!) {
  signIn(data: $data) {
    id
  }
}
    `;
export type SignInMutationFn = Apollo.MutationFunction<SignInMutation, SignInMutationVariables>;

/**
 * __useSignInMutation__
 *
 * To run a mutation, you first call `useSignInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInMutation, { data, loading, error }] = useSignInMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSignInMutation(baseOptions?: Apollo.MutationHookOptions<SignInMutation, SignInMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignInMutation, SignInMutationVariables>(SignInDocument, options);
      }
export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>;
export type SignInMutationResult = Apollo.MutationResult<SignInMutation>;
export type SignInMutationOptions = Apollo.BaseMutationOptions<SignInMutation, SignInMutationVariables>;
export const SignOutDocument = gql`
    mutation SignOut {
  signOut
}
    `;
export type SignOutMutationFn = Apollo.MutationFunction<SignOutMutation, SignOutMutationVariables>;

/**
 * __useSignOutMutation__
 *
 * To run a mutation, you first call `useSignOutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignOutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signOutMutation, { data, loading, error }] = useSignOutMutation({
 *   variables: {
 *   },
 * });
 */
export function useSignOutMutation(baseOptions?: Apollo.MutationHookOptions<SignOutMutation, SignOutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignOutMutation, SignOutMutationVariables>(SignOutDocument, options);
      }
export type SignOutMutationHookResult = ReturnType<typeof useSignOutMutation>;
export type SignOutMutationResult = Apollo.MutationResult<SignOutMutation>;
export type SignOutMutationOptions = Apollo.BaseMutationOptions<SignOutMutation, SignOutMutationVariables>;
export const SignUpDocument = gql`
    mutation SignUp($data: SignUpInput!) {
  signUp(data: $data) {
    id
  }
}
    `;
export type SignUpMutationFn = Apollo.MutationFunction<SignUpMutation, SignUpMutationVariables>;

/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMutation, { data, loading, error }] = useSignUpMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSignUpMutation(baseOptions?: Apollo.MutationHookOptions<SignUpMutation, SignUpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignUpMutation, SignUpMutationVariables>(SignUpDocument, options);
      }
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = Apollo.MutationResult<SignUpMutation>;
export type SignUpMutationOptions = Apollo.BaseMutationOptions<SignUpMutation, SignUpMutationVariables>;
export const CartItemsDocument = gql`
    query CartItems {
  cart {
    id
    quantity
    product {
      id
      name
      imageUri
      price
    }
  }
}
    `;

/**
 * __useCartItemsQuery__
 *
 * To run a query within a React component, call `useCartItemsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCartItemsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCartItemsQuery({
 *   variables: {
 *   },
 * });
 */
export function useCartItemsQuery(baseOptions?: Apollo.QueryHookOptions<CartItemsQuery, CartItemsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CartItemsQuery, CartItemsQueryVariables>(CartItemsDocument, options);
      }
export function useCartItemsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CartItemsQuery, CartItemsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CartItemsQuery, CartItemsQueryVariables>(CartItemsDocument, options);
        }
export type CartItemsQueryHookResult = ReturnType<typeof useCartItemsQuery>;
export type CartItemsLazyQueryHookResult = ReturnType<typeof useCartItemsLazyQuery>;
export type CartItemsQueryResult = Apollo.QueryResult<CartItemsQuery, CartItemsQueryVariables>;
export const CurrentUserDocument = gql`
    query CurrentUser {
  currentUser {
    id
    email
    firstName
    lastName
    role
  }
}
    `;

/**
 * __useCurrentUserQuery__
 *
 * To run a query within a React component, call `useCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
      }
export function useCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
        }
export type CurrentUserQueryHookResult = ReturnType<typeof useCurrentUserQuery>;
export type CurrentUserLazyQueryHookResult = ReturnType<typeof useCurrentUserLazyQuery>;
export type CurrentUserQueryResult = Apollo.QueryResult<CurrentUserQuery, CurrentUserQueryVariables>;
export const OwnRestaurtantDocument = gql`
    query OwnRestaurtant {
  ownRestaurtant {
    id
    name
    description
    products {
      id
      name
      description
      price
      category
      diet
      imageUri
    }
  }
}
    `;

/**
 * __useOwnRestaurtantQuery__
 *
 * To run a query within a React component, call `useOwnRestaurtantQuery` and pass it any options that fit your needs.
 * When your component renders, `useOwnRestaurtantQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOwnRestaurtantQuery({
 *   variables: {
 *   },
 * });
 */
export function useOwnRestaurtantQuery(baseOptions?: Apollo.QueryHookOptions<OwnRestaurtantQuery, OwnRestaurtantQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OwnRestaurtantQuery, OwnRestaurtantQueryVariables>(OwnRestaurtantDocument, options);
      }
export function useOwnRestaurtantLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OwnRestaurtantQuery, OwnRestaurtantQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OwnRestaurtantQuery, OwnRestaurtantQueryVariables>(OwnRestaurtantDocument, options);
        }
export type OwnRestaurtantQueryHookResult = ReturnType<typeof useOwnRestaurtantQuery>;
export type OwnRestaurtantLazyQueryHookResult = ReturnType<typeof useOwnRestaurtantLazyQuery>;
export type OwnRestaurtantQueryResult = Apollo.QueryResult<OwnRestaurtantQuery, OwnRestaurtantQueryVariables>;
export const ProductDocument = gql`
    query Product($id: ID!) {
  product(id: $id) {
    name
    description
    price
    category
    diet
  }
}
    `;

/**
 * __useProductQuery__
 *
 * To run a query within a React component, call `useProductQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useProductQuery(baseOptions: Apollo.QueryHookOptions<ProductQuery, ProductQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProductQuery, ProductQueryVariables>(ProductDocument, options);
      }
export function useProductLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProductQuery, ProductQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProductQuery, ProductQueryVariables>(ProductDocument, options);
        }
export type ProductQueryHookResult = ReturnType<typeof useProductQuery>;
export type ProductLazyQueryHookResult = ReturnType<typeof useProductLazyQuery>;
export type ProductQueryResult = Apollo.QueryResult<ProductQuery, ProductQueryVariables>;
export const ProductsDocument = gql`
    query Products {
  products {
    id
    name
    description
    price
    imageUri
  }
}
    `;

/**
 * __useProductsQuery__
 *
 * To run a query within a React component, call `useProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductsQuery({
 *   variables: {
 *   },
 * });
 */
export function useProductsQuery(baseOptions?: Apollo.QueryHookOptions<ProductsQuery, ProductsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProductsQuery, ProductsQueryVariables>(ProductsDocument, options);
      }
export function useProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProductsQuery, ProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProductsQuery, ProductsQueryVariables>(ProductsDocument, options);
        }
export type ProductsQueryHookResult = ReturnType<typeof useProductsQuery>;
export type ProductsLazyQueryHookResult = ReturnType<typeof useProductsLazyQuery>;
export type ProductsQueryResult = Apollo.QueryResult<ProductsQuery, ProductsQueryVariables>;
export const RestaurantProductsDocument = gql`
    query RestaurantProducts($id: ID!) {
  restaurant(id: $id) {
    name
    description
    products {
      name
      description
    }
  }
}
    `;

/**
 * __useRestaurantProductsQuery__
 *
 * To run a query within a React component, call `useRestaurantProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useRestaurantProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRestaurantProductsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRestaurantProductsQuery(baseOptions: Apollo.QueryHookOptions<RestaurantProductsQuery, RestaurantProductsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RestaurantProductsQuery, RestaurantProductsQueryVariables>(RestaurantProductsDocument, options);
      }
export function useRestaurantProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RestaurantProductsQuery, RestaurantProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RestaurantProductsQuery, RestaurantProductsQueryVariables>(RestaurantProductsDocument, options);
        }
export type RestaurantProductsQueryHookResult = ReturnType<typeof useRestaurantProductsQuery>;
export type RestaurantProductsLazyQueryHookResult = ReturnType<typeof useRestaurantProductsLazyQuery>;
export type RestaurantProductsQueryResult = Apollo.QueryResult<RestaurantProductsQuery, RestaurantProductsQueryVariables>;
export const RestaurantsDocument = gql`
    query Restaurants {
  restaurants {
    id
    name
    description
  }
}
    `;

/**
 * __useRestaurantsQuery__
 *
 * To run a query within a React component, call `useRestaurantsQuery` and pass it any options that fit your needs.
 * When your component renders, `useRestaurantsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRestaurantsQuery({
 *   variables: {
 *   },
 * });
 */
export function useRestaurantsQuery(baseOptions?: Apollo.QueryHookOptions<RestaurantsQuery, RestaurantsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RestaurantsQuery, RestaurantsQueryVariables>(RestaurantsDocument, options);
      }
export function useRestaurantsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RestaurantsQuery, RestaurantsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RestaurantsQuery, RestaurantsQueryVariables>(RestaurantsDocument, options);
        }
export type RestaurantsQueryHookResult = ReturnType<typeof useRestaurantsQuery>;
export type RestaurantsLazyQueryHookResult = ReturnType<typeof useRestaurantsLazyQuery>;
export type RestaurantsQueryResult = Apollo.QueryResult<RestaurantsQuery, RestaurantsQueryVariables>;
export const UserDocument = gql`
    query User($id: ID!) {
  user(id: $id) {
    id
    email
    firstName
    lastName
    role
  }
}
    `;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserQuery(baseOptions: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;
export const namedOperations = {
  Query: {
    CartItems: 'CartItems',
    CurrentUser: 'CurrentUser',
    OwnRestaurtant: 'OwnRestaurtant',
    Product: 'Product',
    Products: 'Products',
    RestaurantProducts: 'RestaurantProducts',
    Restaurants: 'Restaurants',
    User: 'User'
  },
  Mutation: {
    AddToCart: 'AddToCart',
    removeFromCart: 'removeFromCart',
    UpdateCartQuantity: 'UpdateCartQuantity',
    CreateRestaurant: 'CreateRestaurant',
    CreateProduct: 'CreateProduct',
    DeleteProduct: 'DeleteProduct',
    UpdateProduct: 'UpdateProduct',
    SignIn: 'SignIn',
    SignOut: 'SignOut',
    SignUp: 'SignUp'
  }
}