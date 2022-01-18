import React from 'react';
import * as yup from 'yup';
import { Form, Formik } from 'formik';
import { useParams } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { Input } from '../../components/controls/input';

const validationSchema = yup.object({
  password: yup.string(),
  confirmPassword: yup.string().oneOf([yup.ref('password')]),
});

function validateToken(token: string): never {
  throw new Error('Not yet implemented.');
}

export const ResetPassword: React.FC = (): JSX.Element => {
  const [searchParam] = useSearchParams();
  const token = searchParam.get('token');

  if (token) {
    // Verify token
    if (validateToken(token)) {
      return (
        <Formik
          initialValues={{ password: '', confirmPassword: '' }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            window.alert(JSON.stringify(values));
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => {
            <Form className="full-form box">
              <Input type="email" name="password" label="Email address" />
              <Input
                type="email"
                name="confirmPassword"
                label="Email address"
              />
              <button disabled={isSubmitting}>Change password</button>
            </Form>;
          }}
        </Formik>
      );
    } else {
      return <p>Invalid or expired token.</p>;
    }
  } else {
    return <p>Missing token.</p>;
  }
};
