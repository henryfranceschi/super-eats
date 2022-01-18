import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import {
  namedOperations,
  useCartItemsQuery,
  useRemoveFromCartMutation,
  useUpdateCartQuantityMutation,
} from '../generated/graphql';

export const Cart: React.FC = (): JSX.Element => {
  const { data, loading, error } = useCartItemsQuery();

  const [updateQuantity] = useUpdateCartQuantityMutation({
    refetchQueries: [namedOperations.Mutation.UpdateCartQuantity],
  });

  const [removeFromCart] = useRemoveFromCartMutation({
    refetchQueries: [namedOperations.Query.CartItems],
  });

  if (loading) return <p>loading...</p>;
  if (error || !data) {
    if (error) console.error(error.message);
    return <p>{'error'}</p>;
  }

  const totalCount = data.cart.reduce((acc, { quantity }) => acc + quantity, 0);
  const totalPrice = data.cart
    .reduce((acc, { quantity, product }) => acc + quantity * product.price, 0)
    .toFixed(2);

  return (
    <div className="content-wrapper cart-page">
      <div className="cart-list">
        {data.cart.map(({ id, quantity, product }) => (
          <div className="cart-row" key={id}>
            <img
              src={process.env['API_ENDPOINT'] + product.imageUri}
              alt="product image"
            />
            <div className="inner-box">
              <div className="info-box">
                <h3>{product.name}</h3>
                <p>{`${(product.price * quantity).toFixed(2)}€`}</p>
                <select
                  onChange={(event) => {
                    const quantity: number = parseInt(event.target.value);
                    updateQuantity({
                      variables: { id, quantity },
                      refetchQueries: [namedOperations.Query.CartItems],
                    });
                  }}
                >
                  {[...Array(10).keys()].map((e) => (
                    <option key={e} value={e + 1}>
                      {e + 1}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={async () =>
                  await removeFromCart({ variables: { id } })
                }
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="info box">{`Total (${totalCount} products): ${totalPrice}€`}</div>
    </div>
  );
};
