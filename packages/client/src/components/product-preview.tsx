import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { ProductsQuery } from '../generated/graphql';

type Props = Omit<ProductsQuery['products'][0], '__typename'> & {
  addToCart: (quantity: number) => void;
};

export const ProductPreview: React.FC<Props> = ({
  id,
  name,
  description,
  price,
  imageUri,
  addToCart,
}): JSX.Element => (
  <div className="product-preview box">
    <img src={process.env['API_ENDPOINT'] + imageUri} alt="product image" />
    <div className="inner-box">
      <div className="info-box">
        <h3>{name}</h3>
        <p>{description}</p>
      </div>
      <div>
        <button onClick={() => addToCart(1)}>
          <FontAwesomeIcon icon={faCartPlus} />
        </button>
        <p>{price}€</p>
      </div>
    </div>
  </div>
);
