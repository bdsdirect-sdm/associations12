import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useMutation } from '@tanstack/react-query';
import { loginUser } from '../api/api';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const mutation = useMutation((data: { email: string; password: string }) => loginUser(data.email, data.password), {
    onSuccess: () => {
      navigate('/dashboard');
    },
    onError: (error: any) => {
      alert(error.response.data.message || 'Login failed');
    },
  });

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={Yup.object({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().required('Password is required'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        mutation.mutate(values);
      }}
    >
      <Form>
        <div>
          <label htmlFor="email">Email</label>
          <Field name="email" type="email" />
          <ErrorMessage name="email" component="div" />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <Field name="password" type="password" />
          <ErrorMessage name="password" component="div" />
        </div>

        <button type="submit">Login</button>
      </Form>
    </Formik>
  );
};

export default Login;
