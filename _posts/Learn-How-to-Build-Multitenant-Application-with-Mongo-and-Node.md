---
title: 'Learn How to Build Multitenant Application with Mongo and Node'
excerpt: 'Multi-tenancy software architecture is a type of architecture where single application instance can serve multiple clients. We will build app with node where we can simulate multi-tenancy concept. After reading this you should have clear idea how to implement it in your project'
coverImage: '/assets/blog/cover/multitenancy-mongodb.jpeg'
date: '23-12-2021'
slug: 'Learn-How-to-Build-Multitenant-Application-with-Mongo-and-Node'
author: 'Damian Piwowarczyk'
keywords: 'Multitenancy Nodejs MongoDB Tutorial'
canonical: 'https://damiandev.com/blog/Learn-How-to-Build-Multitenant-Application-with-Mongo-and-Node'
---

In my last post, I compared single-tenancy vs multi-tenancy software architecture. Today we will look at how we can build a simple application that will let us handle multiple tenant. We will go with clean nodejs, mongodb, and mongoose for object modeling.

Let's imagine we need to build an API that lets customers to log in and perform CRUD operations on their company databases. Our resources are limited, we need isolation for our customer's data and ability to scale quickly. Spinning up new application instances for each customer will cost too much time and effort. We want something that will allow us to add new clients easily.

We will look at how we could design such an application so we can isolate customer data and add new clients effortlessly. We will only go through a simple example that hopefully will let you understand how you could use this approach in your application.

![Image mt](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/2wfrwf4y4hu30o223bbi.png)

```bash
npm i dontenv mongodb mongoose
```

`touch app.js`
Create self-executing function in `app.js` this will be our start.

```javascript
;(async function main() {
  console.log(employees)
})()
```

`mkdir services`
create `mongo.connect.js` with services directory.
Now we going to import mongoose and dotenv
Then we going to create function that will return our initial connection to database.

```javascript
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: true,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 30000,
}

function connectDB() {
  return new Promise((resolve, reject) => {
    const mongoURL = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_IP}:${process.env.MONGO_PORT}/?authSource=admin`
    mongoose
      .connect(mongoURL, mongoOptions)
      .then((conn) => {
        console.log('connected')
        resolve(conn)
      })
      .catch((error) => reject(error))
  })
}

export default connectDB
```

Great, now we have our connection to mongodb established. OK, how are we going to handle our connection to databases? The operation of closing and opening databases is very expensive so we will use a different approach. We have something called a connection pool in mongo client.

**A connection pool** is a cache of open, ready-to-use database connections maintained by the driver. Your application can seamlessly get connections from the pool, perform operations, and return connections back to the pool. Connection pools are thread-safe.

MongoDB client by default gives us pool size of 5, which means we can only perform 5 concurrent operations at the time. Other operations will have to wait until connection is returned to the pool. Lucky we can easily increase our pool size by passing it in our mongoOption config that we defined earlier.

**Benefits of a Connection Pool**
A connection pool helps reduce application latency and the number of times new connections are created.

A connection pool creates connections at startup. Applications do not need to manually return connections to the pool. Instead, connections return to the pool automatically.

Some connections are active and some are inactive but available. If your application requests a connection and there’s an available connection in the pool, a new connection does not need to be created.

The larger size of pools defined the more resource-hungry our database service will be.

Ok, lets create folder models and define `employeeSchama.js` and `tenantSchema.js` Tenant will represent our customers who will use the application. Each tenant will have a database where employeeSchema will be used as a blueprint for employee data.

```javascript
import mongoose from 'mongoose'

const employeeSchema = mongoose.Schema({
  employeeId: {
    type: String,
    unique: true,
  },
  name: {
    type: String,
  },
  companyName: {
    type: String,
  },
})
export default employeeSchema
```

```javascript
import mongoose from 'mongoose'

const tenantSchema = mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  companyName: {
    type: String,
    unique: true,
  },
})

export default tenantSchema
```

Now we can import everything in our app.js file

```javascript
import connectDB from './services/mongo.connect.js'
import TenantSchema from './models/tenantSchema.js'
import EmployeeSchema from './models/employeeSchema.js'

// Indicates which Schemas are used by whom
const CompanySchemas = new Map([['employee', EmployeeSchema]])
const TenantSchemas = new Map([['tenant', TenantSchema]])

/** Switch db on same connection pool
 * @return new connection
 */
const switchDB = async (dbName, dbSchema) => {
  const mongoose = await connectDB()
  if (mongoose.connection.readyState === 1) {
    const db = mongoose.connection.useDb(dbName, { useCache: true })
    // Prevent from schema re-registration
    if (!Object.keys(db.models).length) {
      dbSchema.forEach((schema, modelName) => {
        db.model(modelName, schema)
      })
    }
    return db
  }
  throw new Error('error')
}

/**
 * @return model from mongoose
 */
const getDBModel = async (db, modelName) => {
  return db.model(modelName)
}
```

The following example does not contain checks if database exists, so once we pass db name that doesn't exist new database will be created

getDBModel will allow us to get the registered model for our db.

Lets write function to create our fake customers

```javascript
const initTennants = async () => {
  const tenantDB = await switchDB('AppTenants', TenantSchemas)
  const tenant = await getDBModel(tenantDB, 'tenant')
  await tenant.deleteMany({})
  const tenantA = await tenant.create({
    name: 'Steve',
    email: 'Steve@example.com',
    password: 'secret',
    companyName: 'Apple',
  })
  const tenantB = await tenant.create({
    name: 'Bill',
    email: 'Bill@example.com',
    password: 'secret',
    companyName: 'Microsoft',
  })
  const tenantC = await tenant.create({
    name: 'Jeff',
    email: 'Jeff@example.com',
    password: 'secret',
    companyName: 'Amazon',
  })
}
```

call function in our main method
`await initTennants()`
Now we have a database with 3 customers in it.

Here is another function that will let check.

```javascript
const getAllTenants = async () => {
  const tenantDB = await switchDB('AppTenants', TenantSchemas)
  const tenantModel = await getDBModel(tenantDB, 'tenant')
  const tenants = await tenantModel.find({})
  return tenants
}
```

Now we will create for each customer separated db with company name and create employee in each of them.

```javascript
const initEmployees = async () => {
  const customers = await getAllTenants()
  const createEmployees = customers.map(async (tenant) => {
    const companyDB = await switchDB(tenant.companyName, CompanySchemas)
    const employeeModel = await getDBModel(companyDB, 'employee')
    await employeeModel.deleteMany({})
    return employeeModel.create({
      employeeId: Math.floor(Math.random() * 10000).toString(),
      name: 'John',
      companyName: tenant.companyName,
    })
  })
  const results = await Promise.all(createEmployees)
}
```

List of employees for each company database

```javascript
const listAllEmployees = async () => {
  const customers = await getAllTenants()
  const mapCustomers = customers.map(async (tenant) => {
    const companyDB = await switchDB(tenant.companyName, CompanySchemas)
    const employeeModel = await getDBModel(companyDB, 'employee')
    return employeeModel.find({})
  })
  const results = await Promise.all(mapCustomers)
  return results
}
```

This is what will end up with.
![Image dbs](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/lypx56keoua4zfemilbz.png)

Our main function should look like this

```javascript
;(async function main() {
  await initTennants()
  await initEmployees()
  const tenants = await getAllTenants()
  const employees = await listAllEmployees()
  console.log(tenants)
  console.log(employees)
})()
```

Excellent, based of that example you could take it further and create a fully functional API where you could authenticate customers and let them pull data from their databases.

Thanks for reading.
if you learned something from it press like and I will create more similar content :)

[Github repo](https://github.com/przpiw/mongodb-multitenancy)
