import { gql, useMutation } from '@apollo/client';
import { Form, Formik } from 'formik';
import React from 'react';
import { useNavigate } from 'react-router';
import { Input } from '../../components/controls/input';
import { useCreateRestaurantMutation } from '../../generated/graphql';

export const AddRestaurant: React.FC = (): JSX.Element => {
  const [createRestaurant, { error }] = useCreateRestaurantMutation();
  const navigate = useNavigate();

  return (
    <main className="page">
      <div className="content-wrapper">
        <Formik
          initialValues={{
            name: '',
          }}
          onSubmit={async (values, { setSubmitting }) => {
            await createRestaurant({ variables: { data: { ...values } } });
            if (!error) {
              navigate('/merchant/dashboard');
            }
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="full-form">
              <Input type="text" name="name" />
              <button type="submit" disabled={isSubmitting}>
                Create Restautant
              </button>
              {error ? <p>{error.message}</p> : null}
            </Form>
          )}
        </Formik>
      </div>
    </main>
  );
};
