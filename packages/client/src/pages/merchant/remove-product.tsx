import { gql, useMutation } from '@apollo/client';
import { Form, Formik } from 'formik';
import React from 'react';
import * as yup from 'yup';
import { Input } from '../../components/controls/input';
import { useDeleteProductMutation } from '../../generated/graphql';

const validationSchema = yup.object({
  id: yup.string(),
});

export const RemoveProduct: React.FC = (): JSX.Element => {
  const [deleteProduct, { loading }] = useDeleteProductMutation();
  return (
    <main className="page">
      <div className="content-wrapper">
        <Formik
          initialValues={{
            id: '',
          }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            alert(JSON.stringify(values, null, 2));
            await deleteProduct({ variables: { id: values.id } });
          }}
        >
          {({ getFieldProps }) => (
            <Form>
              {/* <input name="id" type="text" {...getFieldProps('id')} /> */}
              <Input name="id" type="text" />
              <button type="submit">Delete</button>
            </Form>
          )}
        </Formik>
      </div>
    </main>
  );
};
