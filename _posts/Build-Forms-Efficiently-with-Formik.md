---
title: 'Build Forms Efficiently With Formik'
excerpt: 'Building forms can be sometimes challenging. In this tutorial, I will describe how we can design reusable form components with the implementation of formik lightweight library which can help us to speed up the process of building forms for our application.'
coverImage: '/assets/blog/cover/forms-formik.jpeg'
date: '17-12-2021'
slug: 'Build-Forms-Efficiently-with-Formik'
author: 'Damian Piwowarczyk'
keywords: 'React Formik Javascript Tutorial'
canonical: 'https://damiandev.com/blog/Build-Forms-Efficiently-with-Formik'
---

### Intro

Re-usability and smart design are crucial aspects when building web applications. Planning earlier how the user interface can be broken into components and how components can be reused over different data will reduce spaghetti code and improve the structure of our application.

Building forms can be sometimes challenging. In this tutorial, I will describe how we can design reusable form components with the implementation of formik lightweight library which can help us to speed up the process of building forms for our application.

### What is [Formik](https://formik.org/docs/overview)

Formik is one of the most popular open-source form libraries for React & React Native. API is well documented and the library lets us choose whether we want to use formik components or utilize it with HTML elements.
Formik takes care of the repetitive and annoying stuff—keeping track of values/errors/visited fields, orchestrating validation, and handling submission—so you don't have to. This means you spend less time wiring up state and change handlers and more time focusing on your business logic.

In this example we will build LoginForm with custom react components that will let you build. We utilise Formik to speed up process of building forms and yup to create validation schema. We will handle and display error messages based on our validation schema. We will use nextjs as boilerplate application.
Lets get started!

### Create next.js project & install dependencies

```javascript
npx create-next-app nextjs-formik &&
cd nextjs-formik && npm i formik && npm i yup
```

### Project setup

```javascript
mkdir components && cd components && mkdir Form && cd Form && touch InputField.js && touch LoginForm.js && FormLabel.js && mkdir validation && cd validation && touch loginSchema.js
```

We will start with creating InputField and FormLabel components that we will can be reused later in our application.

```javascript
export const InputField = ({ id, type, style, onChange }) => (
  <>
    <input id={id} type={type} onChange={onChange} style={style}></input>
  </>
)
```

```javascript
export const FormLabel = ({ text, style }) => (
  <>
    <label style={style}>{text}</label>
  </>
)
```

### LoginForm

Now we will create create login form with Formik and our components

```javascript
import { useFormik } from 'formik'
import { InputField } from './InputField'
import { FormLabel } from './FormLabel'
//import { loginSchema } from './validation/loginSchema'

const LoginForm = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    //validationSchema: loginSchema,
    onSubmit: (values) => {
      // Once form submited ex. {Email: 'John@example.com', Password: 'secret'}
    },
  })
  return (
    <>
      <form id='loginform' onSubmit={formik.handleSubmit}>
        <FormLabel text='Email: ' />
        <InputField
          id='email'
          name='email'
          onChange={formik.handleChange}
          style={{ backgroundColor: 'gray' }}
        />
        <FormLabel style={{ color: 'red' }} text={formik.errors.email} />
        <br></br>
        <FormLabel text='Password: ' />
        <InputField id='password' onChange={formik.handleChange} />
        <FormLabel style={{ color: 'red' }} text={formik.errors.password} />
      </form>
      <button form='loginform' type='submit'>
        Login
      </button>
    </>
  )
}

export default LoginForm
```

Excellent! We just created our login form. Now we can add validation using [yup](https://www.npmjs.com/package/yup) a JavaScript schema builder that gives us the power to create custom validation schemas. Yup schemas will let us validate form input and with a combination of formik we can display errors based on rules that we specified in our schema object.
It's a good practice to keep validation schemas in separated files as it improves the readability of code.

Let add validation schema to loginSchema

```javascript
import * as Yup from 'yup'
export const loginSchema = Yup.object().shape({
  email: Yup.string().email().required('Required'),
  password: Yup.string().required('Required').min(3, 'Too Short!'),
})
```

Now we can uncomment following

```javascript
// import { loginSchema } from './validation/loginSchema'
// validationSchema: loginSchema
```

Last part is to go to pages/index.js

```javascript
import LoginForm from '../components/Form/LoginForm'

export default function Home() {
  return (
    <div>
      <LoginForm />
    </div>
  )
}
```

This shows how we speed up form building process and save some time in the future.
By using our simple custom build react components we could extend it even further by adding additional props, styles that suit our needs.

In the next article, I will cover how we can add tailwind and style our forms.

Hope this tutorial was helpful. Thanks for reading!

[Github repo](https://github.com/przpiw/nextjs-formik-loginform)
