import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@tanstack/react-query';
import { registerUser } from '../api/api';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const navigate = useNavigate();
  
  const mutation = useMutation((data: FormData) => registerUser(data), {
    onSuccess: () => {
      alert('Registration successful');
      navigate('/password-reset');
    },
    onError: (error: any) => {
      alert(error.response.data.message || 'Registration failed');
    },
  });

  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        phoneNo: '',
        gender: 'male',
        userType: '1',
        hobbies: [],
        profilePic: null,
        resume: null,
      }}
      validationSchema={Yup.object({
        firstName: Yup.string().required('First name is required'),
        lastName: Yup.string().required('Last name is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        phoneNo: Yup.string().length(10, 'Phone number must be 10 digits').required('Phone number is required'),
        userType: Yup.string().required('User type is required'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        const formData = new FormData();
        formData.append('firstName', values.firstName);
        formData.append('lastName', values.lastName);
        formData.append('email', values.email);
        formData.append('phoneNo', values.phoneNo);
        formData.append('gender', values.gender);
        formData.append('userType', values.userType);
        formData.append('hobbies', JSON.stringify(values.hobbies));
        if (values.profilePic) formData.append('profilePic', values.profilePic);
        if (values.resume) formData.append('resume', values.resume);
        
        mutation.mutate(formData);
      }}
    >
      {({ setFieldValue, values }) => (
        <Form>
          <div>
            <label htmlFor="firstName">First Name</label>
            <Field name="firstName" type="text" />
            <ErrorMessage name="firstName" component="div" />
          </div>

          <div>
            <label htmlFor="lastName">Last Name</label>
            <Field name="lastName" type="text" />
            <ErrorMessage name="lastName" component="div" />
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <Field name="email" type="email" />
            <ErrorMessage name="email" component="div" />
          </div>

          <div>
            <label htmlFor="phoneNo">Phone Number</label>
            <Field name="phoneNo" type="text" />
            <ErrorMessage name="phoneNo" component="div" />
          </div>

          <div>
            <label htmlFor="gender">Gender</label>
            <Field as="select" name="gender">
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Field>
          </div>

          <div>
            <label htmlFor="userType">User Type</label>
            <Field as="select" name="userType">
              <option value="1">Job Seeker</option>
              <option value="2">Agency</option>
            </Field>
          </div>

          {values.userType === '1' && (
            <>
              <div>
                <label htmlFor="profilePic">Profile Picture</label>
                <input
                  name="profilePic"
                  type="file"
                  onChange={(event) => {
                    if (event.currentTarget.files) {
                      setFieldValue('profilePic', event.currentTarget.files[0]);
                    }
                  }}
                />
              </div>

              <div>
                <label htmlFor="resume">Resume</label>
                <input
                  name="resume"
                  type="file"
                  onChange={(event) => {
                    if (event.currentTarget.files) {
                      setFieldValue('resume', event.currentTarget.files[0]);
                    }
                  }}
                />
              </div>
            </>
          )}

          <button type="submit">Register</button>
        </Form>
      )}
    </Formik>
  );
};

export default Register;
