import { Form, Formik } from 'formik';
import React from 'react';
import { Link } from 'react-router-dom';
import { Input } from '../../components/controls/input';
import {
  Categories,
  Diets,
  namedOperations,
  useCreateProductMutation,
} from '../../generated/graphql';
import { createProductSchema } from './schemas';

type FormValues = {
  name: string;
  description?: string;
  price: number;
  category: Categories;
  diet?: Diets;
};

export const AddProduct: React.FC = () => {
  const [addProduct, { error }] = useCreateProductMutation();

  const initialValues: FormValues = {
    name: '',
    description: '',
    price: 0.0,
    category: Categories.None,
    diet: Diets.None,
  };

  return (
    <main>
      <Link to="/merchant">back</Link>
      <Formik
        initialValues={initialValues}
        validationSchema={createProductSchema}
        onSubmit={(values) => {
          // alert(JSON.stringify(values, null, 2))
          void addProduct({
            variables: { data: { ...values } },
            refetchQueries: [namedOperations.Query.RestaurantProducts],
          });
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
            <button type="submit">Add Product</button>
            {error ? <p>{JSON.stringify(error, null, 2)}</p> : null}
          </Form>
        )}
      </Formik>
    </main>
  );
};
