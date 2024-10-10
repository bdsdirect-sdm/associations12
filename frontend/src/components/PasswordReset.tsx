import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useMutation } from '@tanstack/react-query';
import { resetPassword } from '../api/api';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const PasswordReset: React.FC = () => {
  const navigate = useNavigate();
  const mutation = useMutation((data: { password: string }) => resetPassword(data.password), {
    onSuccess: () => {
      alert('Password reset successful');
      navigate('/login');
    },
    onError: (error: any) => {
      alert(error.response.data.message || 'Password reset failed');
    },
  });

  return (
    <Formik
      initialValues={{ password: '' }}
      validationSchema={Yup.object({
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        mutation.mutate(values);
      }}
    >
      <Form>
        <div>
          <label htmlFor="password">New Password</label>
          <Field name="password" type="password" />
          <ErrorMessage name="password" component="div" />
        </div>

        <button type="submit">Reset Password</button>
      </Form>
    </Formik>
  );
};

export default PasswordReset;
