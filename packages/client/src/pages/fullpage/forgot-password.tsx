import React from 'react';
import * as yup from 'yup';
import { Form, Formik } from 'formik';
import { Input } from '../../components/controls/input';

const validationSchema = yup.object({
  email: yup.string().email(),
});

export const ForgotPassword: React.FC = (): JSX.Element => {
  return (
    <div className="full-view box">
      <Formik
        initialValues={{ email: '' }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          window.alert(JSON.stringify(values));
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="full-form">
            <h1>Forgot password</h1>
            <Input type="email" name="email" />
            <button className="btn-light" type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
          // <input type="text" onChange={handleChange} onBlur={handleBlur} value={values.email} />
        )}
      </Formik>
    </div>
  );
};
