import React, { useState } from 'react';
import { Overlay } from '../components/overlay';
import { ProductPreview } from '../components/product-preview';

interface OtherProps {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}

const Other: React.FC<OtherProps> = ({ count, setCount }) => {
  return (
    <>
      <div>count: {count}</div>
      <button onClick={() => setCount((current) => current + 1)}>
        Increment
      </button>
    </>
  );
};

export const Test: React.FC = (): JSX.Element => {
  const [count, setCount] = useState(0);
  return <Other count={count} setCount={setCount} />;
};
