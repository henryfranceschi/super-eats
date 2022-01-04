import React from 'react';
import { Link } from 'react-router-dom';
import {
  namedOperations,
  useDeleteProductMutation,
  useOwnRestaurtantQuery,
} from '../../generated/graphql';

export const MerchantHome: React.FC = (): JSX.Element => {
  const { data, loading, error } = useOwnRestaurtantQuery();
  const [deleteProduct] = useDeleteProductMutation();

  if (loading || !data) return <p>loading...</p>;
  if (error) return <p>{error.message}</p>;

  const { name, description, products } = data.ownRestaurtant;

  products.map((elem) => <div key={elem.id}>{elem.name}</div>);

  return (
    <table>
      <tr>
        <th>Id</th>
        <th>Name</th>
        <th>Description</th>
        <th>Price</th>
        <th>Category</th>
        <th>Diet</th>
        <th>ImageUri</th>
        <th>Actions</th>
      </tr>
      <tbody>
        {products.map(
          ({ id, name, description, price, category, diet, imageUri }) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{name}</td>
              <td>{description}</td>
              <td>{price}</td>
              <td>{category}</td>
              <td>{diet}</td>
              <td>{imageUri}</td>
              <td>
                {<Link to={'update-product/' + id}>Edit</Link>}
                <button
                  onClick={() => {
                    const res = confirm(
                      `Are you sure you want to delete product ${name}`
                    );
                    if (res) {
                      deleteProduct({
                        variables: { id },
                        refetchQueries: [
                          namedOperations.Query.RestaurantProducts,
                        ],
                      });
                    }
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          )
        )}
      </tbody>
    </table>
  );
};
