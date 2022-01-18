import React from 'react';
import * as yup from 'yup';
import { Form, Formik } from 'formik';
import { useSignUpMutation } from '../../generated/graphql';
import { Input } from '../../components/controls/input';
import { useNavigate } from 'react-router';

const validationSchema = yup.object({
  firstName: yup.string().required('required'),
  lastName: yup.string().required('required'),
  email: yup
    .string()
    .required('required')
    .email('must be a valid email address'),
  password: yup.string().required('required'),
  confirmPassword: yup
    .string()
    .required('required')
    .oneOf([yup.ref('password')], 'passwords must match'),
});

export const SignUp: React.FC = (): JSX.Element => {
  const [signUp, { error }] = useSignUpMutation();
  const navigate = useNavigate();

  return (
    <main className="full-view">
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          const result = await signUp({ variables: { data: { ...values } } });
          setSubmitting(false);
          window.alert(JSON.stringify(result));
        }}
      >
        {({ isSubmitting }) => (
          <Form className="full-form sign-up-form box">
            <h1>Sign up</h1>
            <div className="input-row">
              <Input type="text" name="firstName" />
              <Input type="text" name="lastName" />
            </div>
            <Input type="email" name="email" label="Email address" />
            <div className="input-row">
              <Input type="password" name="password" />
              <Input type="password" name="confirmPassword" />
            </div>
            {/* <Field type='email' name='email' />
                            <ErrorMessage name='email' component='div' />
                            <Field type='password' name='password' />
                            <ErrorMessage name='password' component='div' /> */}
            <button className="btn-light" type="submit" disabled={isSubmitting}>
              Submit
            </button>
            {error ? <p className="label error">{error.message}</p> : null}
          </Form>
        )}
      </Formik>
    </main>
  );
};
