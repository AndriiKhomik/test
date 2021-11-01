import React from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from 'yup';

import './Registration.scss';

const LoginSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string()
    .min(6, 'Should contains at least 6 characters').required('Required')
    // eslint-disable-next-line
    .matches(/^[0-9A-Za-z]*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?][0-9a-zA-Z]*$/, 'Should contains at least one special character')
});

const Registration = ({shouldShowNameInput}) => {

  return (
    <Formik
      initialValues={{name: '', email: '', password: ''}}
      validationSchema={LoginSchema}
      onSubmit={(values, {setSubmitting}) => {
        localStorage.setItem('inputValues', null)
        if (values.email === 'intvw@g.co' && values.password === 'aa@AA1') {
          window.location.replace('/home');
          setSubmitting(false);
          localStorage.setItem('user', values.name);
        }
      }}
    >
      {({values}) => (
        <Form className='form'>
          {shouldShowNameInput ?
            <div className='form-group'>
              <Field name="name"
                     type="text"
                     className="form-control"
                     placeholder="Name"/>
              <ErrorMessage name="name"/>
            </div> : null
          }
          <div className='form-group'>
            <Field name="email"
                   type="email"
                   className="form-control"
                   placeholder="Email"/>
            <ErrorMessage name="email"
                          component='div'
                          style={{color: 'red'}}/>
          </div>

          <div className='form-group'>
            <Field name="password"
                   type="password"
                   className="form-control"
                   placeholder="Password"/>
            <ErrorMessage name="password"
                          component='div'
                          style={{color: 'red'}}/>
          </div>

          <button type='submit'
                  className='btn btn-warning form-group'>Login
          </button>
          {shouldShowNameInput && (!((values.email === '' && values.password === '' && values.name === ''))) ?
            <button type='button'
                    className='btn btn-outline-warning'>Resume</button> : null}
        </Form>
      )}
    </Formik>
  )
};

export default Registration;