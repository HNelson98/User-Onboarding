import React, { useState, useEffect } from 'react';
import * as yup from "yup";
import axios from 'axios';

const formSchema = yup.object().shape({
  name: yup.string().required('Please enter your Full name'),
  email: yup.string().email('must be a valid email address.').required('Please enter your Email'),
  password: yup.string().required('Please enter a password'),
  terms: yup.boolean().oneOf([true], 'please agree to the terms of service')
})

const Form = () => {
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    password: '',
    terms: '',
  });

  const [error, setError] = useState({
    name: '',
    email: '',
    password: '',
    terms: '',
  });

  const [post, setPost] = useState([]);

  useEffect(() => {
    formSchema.isValid(formValues).then(valid => {
      setSubmitDisabled(!valid);
    });
  }, [formValues]);

  const onFormSubmit = event => {
    event.preventDefault();
    axios
      .post("https://reqres.in/api/users", formValues)
      .then(res => {
        setPost(res.data);

        setFormValues({
          name: '',
          email: '',
          password: '',
          terms: '',
        });
      })
      .catch(err => console.log(err.response));
  };

  const validateChange = event => {
    yup
      .reach(formSchema, event.target.name)
      .validate(event.target.name === 'terms' ? event.target.checked : event.target.value)
      .then(valid => {
        setError({
          ...error,
          [event.target.name]: ''
        });
      })
      .catch(err => {
        console.log(err)
        setError({
          ...error,
          [event.target.name]: err.errors[0]
        });
      });
  };

  const inputChange = event => {
    event.persist();
    const newFormData = {
      ...formValues, [event.target.name]:
        event.target.type === 'checkbox' ? event.target.checked : event.target.value
    };

    validateChange(event);
    setFormValues(newFormData);
  }
    return(
        <form onSubmit={onFormSubmit}>
            <label htmlFor= 'name'> 
              Full Name
            <input
            onChange={inputChange}
            value={formValues.name}
            name='name'
            type='text'
          />
          {error.name.length > 0 ? <p className='error'>{error.name}</p> : null }
        </label><br />

        <label htmlFor= 'email'> Email
            <input
            onChange={inputChange}
            value={formValues.email}
            name='email'
            type='text'
          />
          {error.email.length > 0 ? <p className='error'>{error.email}</p> : null }
        </label><br />

        <label htmlFor= 'password'> 
          Password
            <input
            onChange={inputChange}
            value={formValues.password}
            name='password'
            type='password'
          />
          {error.password.length > 0 ? <p className='error'>{error.password}</p> : null }
        </label><br />

        <label htmlFor= 'terms'> 
        
            <input
            onChange= {inputChange}
            checked= {formValues.terms}
            name= 'terms'
            type='checkbox'
          />
          Terms of Service
          {error.terms.length > 0 ? <p className='error'>{error.terms}</p> : null }
        </label><br />


        <pre>{JSON.stringify(post, null, 2)}</pre>
        <button disabled={submitDisabled}>Submit</button>

            
        </form>
       
    )
}

export default Form;