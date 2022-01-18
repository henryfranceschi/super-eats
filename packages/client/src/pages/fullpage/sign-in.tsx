import { Form, Formik } from 'formik';
import * as yup from 'yup';
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
import {
  useCurrentUserQuery,
  useSignInMutation,
} from '../../generated/graphql';
import { Input } from '../../components/controls/input';
import { Link } from 'react-router-dom';
import { AppContext } from '../../AppContext';

const validationSchema = yup.object({
  email: yup
    .string()
    .required('required')
    .email('must be a valid email address'),
  password: yup.string().required('required'),
});

export const SignIn: React.FC = (): JSX.Element => {
  const { appState, updateState } = useContext(AppContext);
  const navigate = useNavigate();

  const [signin, { loading, error }] = useSignInMutation();

  useEffect(() => {
    if (appState.user) {
      navigate('/');
    } else {
      console.log('state changed');
      console.log(appState);
    }
  }, [navigate, appState]);

  return (
    <main className="full-view">
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          const result = await signin({ variables: { data: { ...values } } });
          updateState({
            user: result.data?.signIn,
          });
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="full-form  box">
            <h1>Sign in</h1>
            <Input type="email" name="email" label="Email address" />
            <Input type="password" name="password" />
            <p>
              <Link to="/forgot-password">Forgot your password?</Link>
            </p>
            {/* <Field type='email' name='email' />
                            <ErrorMessage name='email' component='div' />
                            <Field type='password' name='password' />
                            <ErrorMessage name='password' component='div' /> */}
            <button className="btn-light" type="submit" disabled={isSubmitting}>
              Submit
            </button>
            {error ? <p className="label error">{error.message}</p> : null}
            <p>
              Need an account? <Link to="/sign-up">Sign up</Link>
            </p>
          </Form>
        )}
      </Formik>
    </main>
  );
};
