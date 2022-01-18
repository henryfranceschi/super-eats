import { gql, useMutation, useQuery } from '@apollo/client';
import React from 'react';
import * as yup from 'yup';
import { updateProductSchema } from './schemas';
import { Form, Formik } from 'formik';
import { Input } from '../../components/controls/input';
import {
  Categories,
  Diets,
  useDeleteProductMutation,
  useProductQuery,
  useUpdateProductMutation,
} from '../../generated/graphql';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

type FormValues = {
  name?: string;
  description?: string | null;
  price?: number;
  category?: Categories;
  diet?: Diets;
  [key: string]: unknown;
};
// const productId = 'a894d665-db19-47ab-ab5e-d62c920a8b8f';
export const UpdateProduct: React.FC = () => {
  const params = useParams();
  const productId = params.productId!;
  const { loading, data } = useProductQuery({
    variables: { id: productId },
  });
  const [updateProduct, { error }] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  if (loading) {
    return <p>loading...</p>;
  }

  if (data !== undefined) {
    const initialValues: FormValues = { ...data.product };
    const validationSchema = yup.object({ updateProductSchema });
    return (
      <main className="page">
        <Link to="/merchant">back</Link>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            const data: FormValues = Object.entries(values)
              .filter(([key, value]) => value !== initialValues[key])
              .reduce(
                (total, [key, value]) => Object.assign(total, { [key]: value }),
                {}
              );

            alert(JSON.stringify(data, null, 2));
            void updateProduct({ variables: { id: productId, data } });
          }}
        >
          {({ getFieldProps }) => (
            <Form className="full-form">
              <Input name="name" type="text" />
              <Input name="description" type="text" />
              <Input name="price" type="number" />
              <select {...getFieldProps('category')}>
                {Object.values(Categories).map((value, index) => (
                  <option key={index} value={value}>
                    {value}
                  </option>
                ))}
              </select>
              <select {...getFieldProps('diet')}>
                {Object.values(Diets).map((value, index) => (
                  <option key={index} value={value}>
                    {value}
                  </option>
                ))}
              </select>
              <button type="submit">Update</button>
              {error ? <p>{JSON.stringify(error, null, 2)}</p> : null}
            </Form>
          )}
        </Formik>
      </main>
    );
  }

  return <pre>{JSON.stringify(error, null, 2)}</pre>;
};
