---
title: 'Build Forms with React-Hook-Form'
excerpt: 'React Hook Form adopts the use of uncontrolled inputs using ref instead of depending on the state to control the inputs. This approach makes the forms more performant and reduces the number of re-renders.'
coverImage: '/assets/blog/cover/react-hook-form.jpeg'
date: '14-12-2021'
slug: 'Build-Forms-with-React-Hook-Form'
author: 'Damian Piwowarczyk'
keywords: 'React Form-Hook Javascript Tutorial'
---

Building reusable forms can be sometimes challenging. In this tutorial, I will demonstrate how we can build reusable form components with the implementation of react useForHook.
We will use next.js boilerplate for this example.

### React Hook Form

React Hook Form adopts the use of uncontrolled inputs using ref instead of depending on the state to control the inputs. This approach makes the forms more performant and reduces the number of re-renders.

The package is small in size and has zero dependencies. The API is well documented and provides a seamless experience to developers when working with forms. React Hook Form follows HTML standards for validating the forms using constraint-based validation API.

### Create next.js project

```javascript
npx create-next-app nextjs-useformhook &&
cd nextjs-useformhook && npm i react-hook-form
```

### Project Setup

```javascript
mkdir components && cd components && mkdir Form && cd Form && touch InputField.js && touch LoginForm.js
```

First, we will start with creating InputField component with some props and register function that will allow applying validation rules to our input element.

```javascript
export const InputField = ({ label, register, type, error }) => (
  <>
    <label>{label}</label>
    <input
      style={{ background: 'gray' }}
      type={type}
      {...register(label)}
    ></input>
    <p>{error}</p>
  </>
)
```

Now we will look at implementing out LoginForm where we can reuse our InputField component.

```javascript
import { useForm } from 'react-hook-form'
import { InputField } from './InputField'

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  // This will contain all form data once submit button is clicked.
  const onSubmit = (data) => {
    console.log(data)
    // {Email: 'John@example.com', Password: 'secret'}
  }

  register('Email', { required: { value: true, message: 'Email is required' } })
  register('Password', {
    required: { value: true, message: 'Password is required' },
  })
  return (
    <>
      <form id='loginForm' onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label='Email'
          type='email'
          register={register}
          error={errors.Email?.message}
        />
        <InputField
          label='Password'
          type='password'
          register={register}
          error={errors.Password?.message}
        />
      </form>
      <button style={{ background: '#5757ff' }} type='submit' form='loginForm'>
        Login
      </button>
    </>
  )
}
```

To sum up, why use react-form-hook ?
React form hook can help save us time when creating complex forms, increase our application performance by preventing unnecessary re-renderings, and help to manage validation.

[Github repo](https://github.com/przpiw/react-hook-form-login)
