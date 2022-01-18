import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import {
  Categories,
  namedOperations,
  useAddToCartMutation,
  useProductsQuery,
} from '../generated/graphql';
import { Field, Form, Formik } from 'formik';
import { Input } from '../components/controls/input';
import { ProductPreview } from '../components/product-preview';

export const Products: React.FC = (): JSX.Element => {
  const [addToCart] = useAddToCartMutation();
  const { data, loading, error } = useProductsQuery();

  if (loading) return <p>loading...</p>;
  if (error || !data) return <p>error</p>;

  return (
    <div className="content-wrapper product-page">
      <div className="search box">
        <Formik
          initialValues={{ sort: 'popularity' }}
          onSubmit={() => console.log('test')}
          onChan
        >
          {({ isSubmitting, getFieldProps, values }) => (
            <Form onChangeCapture={(event) => console.log(event)}>
              <fieldset className="input-group">
                <legend className="group-label">Sort</legend>
                <Input
                  type="radio"
                  name="sort"
                  label="Popularity"
                  value="popularity"
                />
                <Input type="radio" name="sort" label="Rating" value="rating" />
                <Input type="radio" name="sort" label="Price" value="price" />
              </fieldset>
              <select {...getFieldProps('category')}>
                {Object.values(Categories).map((value, index) => (
                  <option key={index} value={value}>
                    {value}
                  </option>
                ))}
              </select>

              <button type="submit" disabled={isSubmitting}>
                Search
              </button>
            </Form>
          )}
        </Formik>
      </div>
      <div className="product-list">
        {data.products.map((product) => (
          <ProductPreview
            key={product.id}
            {...product}
            addToCart={(quantity) => {
              addToCart({ variables: { productId: product.id, quantity } });
            }}
          />
        ))}
      </div>
    </div>
  );
};
// data.products.map(({ id, name, description, price }) => (
//     <div key={id}>
//         <h3>{name}</h3>
//         <p>{description}</p>
//         <p>{price}</p>
// <button onClick={() => addToCart({ variables: { productId: id, quantity: 1 } })}>
//     <FontAwesomeIcon icon={faCartPlus} />
// </button>
//     </div>))
