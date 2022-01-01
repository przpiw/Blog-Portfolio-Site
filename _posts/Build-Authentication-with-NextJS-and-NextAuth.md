---
title: 'Build Authentication with NextJS and NextAuth v4'
excerpt: 'This article describe process of creating reusable nextjs and nextauth authentication with credential provider. Created app with let you bring your own database for credential verification.'
coverImage: '/assets/blog/cover/nextjs-nextauth.png'
date: '31-12-2021'
slug: 'Build-Authentication-with-NextJS and-NextAuth'
author: 'Damian Piwowarczyk'
keywords: 'nextjs, nextAuth v4, building authentication, web development'
---

Today we are going to build authentication example app using Nextjs and NextAuth. We will use a custom form and credential provider which will let us bring in effortlessly custom DB or endpoint for credential verification in our project. A Good boilerplate if you need authentication functionality with less code in your project.

**What is NextAuth?**
Is a complete open-source solution for the nextjs application. It’s designed to simplify handling multiple ways of handling user authentication for your application. It offers built-in support for authentication services such like OAuth, Google, and many more. NextAuth is also perfect solution for authentication with your database as it offers wide database support.

---

**Demo**

![Image AuthFlow](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/x7nhrebilyqd6t55lghc.gif)

---

### Project setup

```bash
yarn create next-app app && cd app
```

```bash
mkdir components && cd pages && touch login.js && cd api && mkdir auth
```

```bash
npm i next-auth axios
```

Lets start with editing `_app.js`
We will import **SessionProvider** and **userSession**

- **Session Provider** will allow us to supply session data to our Components.

- **useSession** client-side react hook which will let us determine if the user is authenticated and pull user data.

We will create Auth functional component which will allow us to determine whether user should be allowed to access certain pages or if the user needs to be redirected back to login.

```javascript
import { SessionProvider, useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function MyApp({ Component, pageProps: pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      {Component.auth ? (
        <Auth>
          <Component {...pageProps} />
        </Auth>
      ) : (
        <Component {...pageProps} />
      )}
    </SessionProvider>
  )
}

function Auth({ children }) {
  const router = useRouter()
  const { data: session, status, token } = useSession()
  const isUser = !!session?.user
  useEffect(() => {
    if (status === 'loading') return // Do nothing while loading
    if (!isUser) router.push('/login') //Redirect to login
  }, [isUser, status])

  if (isUser) {
    return children
  }
  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return <div>Loading...</div>
}
```

---

Now we'll create a dynamic API route to catch all paths from`/api/auth` as NextAuth by default will need access to these routes. The credential provider lets us implement the logic for user authorization, here we need our database or API to verify that user credentials are valid. Throwing an error will return a message to our login form. In this example for simplicity, I used a hardcoded user. We will use "jwt" an encrypted JWT (JWE) in the session cookie.

Create [...nextauth].js file under `pages/api/auth` by

```javascript
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

//Api route function that is returned from next auth
export default NextAuth({
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        // credentials will to passed from our login form
        // Your own logic here either check agains database or api endpoint
        // e.g. verify password if valid return user object.
        const user = {
          id: 1,
          name: 'john',
          email: 'user@example.com',
          password: '12345',
        }
        if (
          credentials.email === user.email &&
          credentials.password === user.password
        )
          return user
        throw new Error('Incorrect Credentials') // This will be error message displayed in login form
      },
    }),
  ],
  callbacks: {
    // called after sucessful signin
    jwt: async ({ token, user }) => {
      if (user) token.id = user.id
      return token
    }, // called whenever session is checked
    session: async ({ session, token }) => {
      if (token) session.id = token.id
      return session
    },
  },
  secret: 'SECRET_HERE',
  session: {
    strategy: 'jwt',
    maxAge: 1 * 24 * 60 * 60, // 1d
  },
  jwt: {
    secret: 'SECRET_HERE',
    encryption: true,
  },
})
```

---

Now we will implement `login.js`
signIn function will call and pass user details to authorize. if credentials match user will be given access and redirected to '/' protected route.

```javascript
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useState, useRef } from 'react'

const Login = () => {
  const { status, loading } = useSession()
  const router = useRouter()
  const [error, setError] = useState(false)
  const emailRef = useRef()
  const passwordRef = useRef()

  if (status === 'authenticated') {
    router.push('/')
  }
  const loginHandler = async (e) => {
    e.preventDefault()
    const { error } = await signIn('credentials', {
      redirect: false,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      callbackUrl: '/',
    })
    if (error) setError(error)
  }
  return (
    <>
      {status === 'unauthenticated' && (
        <>
          <p>{status}</p>
          <h3>{error}</h3>
          <h3>Log in</h3>
          <form onSubmit={(e) => loginHandler(e)}>
            <input placeholder='Email' name='email' ref={emailRef} />
            <input placeholder='Pasword' name='password' ref={passwordRef} />
            <input type='submit' />
          </form>
        </>
      )}
    </>
  )
}

export default Login
```

---

`index.js` In our index.js we set `Dashboard.auth = true` to mark this route as protected. So only authenticated users can access it.

```javascript
import Navbar from '../components/Navbar'

export default function Dashboard() {
  return (
    <>
      <Navbar />
      <h1>secret dashboard</h1>
    </>
  )
}

Dashboard.auth = true
```

---

Lastly, we will create a Navbar with signout button which will let us destroy the session and redirect to the login page.

`Navbar.js`

```javascript
import { signOut, useSession } from 'next-auth/react'

const Navbar = () => {
  const { data: session } = useSession()
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        backgroundColor: '#b91c1c',
      }}
    >
      <a>{session.user.name}</a>
      &nbsp;
      <button
        onClick={() => {
          signOut({ redirect: false })
        }}
      >
        Signout
      </button>
    </div>
  )
}
export default Navbar
```

---

To sum up, NextAuth is a powerful and flexible authentication solution with developer-friendly documentation. With NextAuth we can simplify user auth for our application and follow good practices and patterns.

I hope this article was helpful to some of you guys. Thanks for reading!

[Github repo](https://github.com/przpiw/NextAuth-Authentication)
