---
title: 'Build Elegant Forms with Formik and TailwindCSS'
excerpt: 'Use formik to speed up your development, reduce code, scale your forms and, handle validation. Collection of utility classes TailwindCSS will give your forms elegant and simple look and let you to style them in efficient way. Tools that every web developer should know'
coverImage: '/assets/blog/cover/forms-formik-tw.png'
date: '20-12-2021'
slug: 'Build-Elegant-Forms-with-Formik-and-Tailwind'
author: 'Damian Piwowarczyk'
keywords: 'React Formik Tailwind Tutorial'
---

In my last post, I went through building custom components with formik. Today we will build something more practical responsive login/registration page that uses formik components and tailwind styling. In the end, we will add yup validation schema that will enable effortless error handling. Hopefully, by the end, you will see how powerful the combination of these tools can be when building reusable pages/forms.

## What is TailwindCSS and what are benefits of using it?

It is a collection of css utility classes, it allows to reduce your code and use standardised approach when designing.
Tailwind out of the box does not provide prebuilt components like bootstrap, materialui or other css libraries. Instead it let you to rapidly build your own components which can be lightweight and customizable.
Tailwind is for devs who what to build fast highly customizable stuff. Tailwind works well with JavaScript libraries.

## What is Formik?

Formik is one of the most popular open-source form libraries for React & React Native. API is well documented and the library lets us choose whether we want to use formik components or utilize it with HTML elements.
Formik takes care of the repetitive and annoying stuff—keeping track of values/errors/visited fields, orchestrating validation, and handling submission—so you don't have to. This means you spend less time wiring up state and change handlers and more time focusing on your business logic.

### This is what we are going to build

#### Large Screen

![Login/Register](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/dc2p7rsxmgw78tsunsyk.gif)

#### Small screen

![Image mobile](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/4q6mabzmsdh0naqhugbu.png)

## 1. Setting up the project

### Install Next.js boilerplate

```bash
npx create-next-app app &&
cd app
```

### Instal Formik & Yup

```bash
npm i formik && npm i yup
```

### Install Tailwind CSS

```bash
npm install -D tailwindcss postcss autoprefixer &&
npx tailwindcss init -p
```

Once installation is completed navigate to`tailwind.config.js`
and replace content with

```javascript
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Add the `@tailwind` directives to your `./styles/globals.css` file to include tailwind styles in our project.

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## 2. Build Form components

### Create files

```bash
mkdir components && cd components && touch LoginForm.js && touch RegisterForm.js
```

Formik out of the box comes with powerful wrappers `<Form/> <Field/> <ErrorMessage/> ` we can directly hook up form elements to `<Formik/>` it will look at name attribute to match form elements. This will mean onSubmit and onChange methods don't need to be linked form/input manually. We pass predefined tailwind `styles` from the parent component to avoid repetition and keep our form file tidy.
`LoginForm.js`

```javascript
import { Formik, Field, Form, ErrorMessage } from 'formik'
//import { loginSchema } from './validation/loginSchema'

export const LoginForm = ({ styles }) => (
  <>
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      // validationSchema={loginSchema}
      onSubmit={(values) => {
        alert(JSON.stringify(values, null, 2))
      }}
    >
      <Form>
        <label className={styles.label} htmlFor='Email'>
          Email
        </label>
        <Field className={styles.field} id='email' name='email' />
        <ErrorMessage component='a' className={styles.errorMsg} name='email' />
        <label className={styles.label} htmlFor='Email'>
          Password
        </label>
        <Field className={styles.field} id='password' name='password' />
        <ErrorMessage
          component='a'
          className={styles.errorMsg}
          name='password'
        />
        <div className='mt-8'>
          <button type='submit' className={styles.button}>
            Login
          </button>
        </div>
      </Form>
    </Formik>
  </>
)
```

Our registration form will look almost identical.
`RegisterForm.js`

```javascript
import { Formik, Field, Form } from 'formik'

export const RegisterForm = ({ styles }) => (
  <>
    <Formik
      initialValues={{
        name: '',
        email: '',
        password: '',
      }}
      onSubmit={(values) => {
        alert(JSON.stringify(values, null, 2))
      }}
    >
      <Form>
        <label className={styles.label} htmlFor='Name'>
          Full Name
        </label>
        <Field className={styles.field} id='name' name='name' />

        <label className={styles.label} htmlFor='Email'>
          Email
        </label>
        <Field className={styles.field} id='email' name='email' />

        <label className={styles.label} htmlFor='Password'>
          Password
        </label>
        <Field className={styles.field} id='Password' name='Password' />
        <div className='mt-8'>
          <button type='submit' className={styles.button}>
            Register
          </button>
        </div>
      </Form>
    </Formik>
  </>
)
```

### 3.Create Member Page

Now we going to create memberPage.js in pages. This will be common component for both Login and Register Form. We will use useState react hook to store info which form should be rendered for user. When user click `Become member` registration form will be render and when `Back to login clicked` we will render back login form.

```javascript
import { useState } from 'react'
import { LoginForm } from '../components/LoginForm'
import { RegisterForm } from '../components/RegisterForm'

export const MemberPage = ({ brand, logoUrl }) => {
  const [isLogin, setIsLogin] = useState(true)
  return (
    <div className='flex flex-row w-full'>
      <div className='py-12 flex-1'>
        <div className='flex bg-white rounded-lg shadow-2xl overflow-hidden mx-auto max-w-sm lg:max-w-4xl'>
          <div
            className='hidden lg:block lg:w-1/2 bg-auto bg-no-repeat	'
            style={{ backgroundImage: `url(${logoUrl})` }}
          ></div>
          <div className='w-full p-8 lg:w-1/2'>
            <h2 className='text-2xl font-semibold text-gray-600 text-center'>
              {brand}
            </h2>
            <a
              onClick={() => {
                setIsLogin(!isLogin)
              }}
              className='flex items-center justify-center mt-4 text-white rounded-lg shadow-md hover:bg-gray-100'
            >
              <h1 className='px-4 py-3 w-5/6 text-center text-gray-600 font-bold'>
                {isLogin ? 'Become Member' : 'Back to Login'}
              </h1>
            </a>
            <div className='mt-4 flex items-center justify-between'>
              <span className='border-b border-red-700 w-1/5 lg:w-1/4'></span>
              <a
                href='#'
                className='text-xs text-center text-gray-500 uppercase'
              >
                {isLogin ? 'Login' : 'Register'}
              </a>
              <span className='border-b w-1/5 border-red-700 lg:w-1/4'></span>
            </div>
            {isLogin ? (
              <LoginForm styles={styles} />
            ) : (
              <RegisterForm styles={styles} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
```

And finally we can go to index.js

```javascript
import { MemberPage } from './memberPage'

export default function Home() {
  return (
    <main className='flex justify-center items-center w-screen h-screen'>
      <MemberPage
        brand={'Brand Name'}
        logoUrl='https://i.imgur.com/l1kG0LQ.png'
      />
    </main>
  )
}
```

Now last step is to define our validation schema so we can see error messages on invalid input.

![Form Validation](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/sx6rdcnhq7ba26sz4e8b.png)

### Setup Directory

```
cd components && mkdir validation && touch loginSchema.js
```

`loginSchema.js`

```javascript
import * as Yup from 'yup'
export const loginSchema = Yup.object().shape({
  email: Yup.string().email().required('Required'),
  password: Yup.string().required('Required').min(3, 'Too Short!'),
})
```

Now we can uncomment following lines from `LoginForm.js`

```javascript
// import { loginSchema } from './validation/loginSchema'
// validationSchema={loginSchema}
```

Now we have good looking login and registration form. We could reuse it for other projects. Next step could be adding forgot password form, validation schema or tweaking styling.

Designing complex forms can be time consuming. I am sure that with this approach we can safe up a some time.

Thanks for reading! Hope this tutorial was helpful.
Stay tuned for next part where we will add redux and implement user authentication.

[Github repo](https://github.com/przpiw/login-formik-tw)
