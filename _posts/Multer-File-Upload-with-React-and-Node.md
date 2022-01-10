---
title: 'Upload Files with React and Multer'
excerpt: 'Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files. It is written on top of busboy for maximum efficiency.'
coverImage: '/assets/blog/cover/react-node-multer.jpeg'
date: '02-09-2021'
slug: 'Multer-File-Upload-with-React-and-Node'
author: 'Damian Piwowarczyk'
keywords: 'Fileupload React Multer Tutorial'
canonical: 'https://damiandev.com/blog/Multer-File-Upload-with-React-and-Node'
---

Today I will briefly describe how to upload images/files from React front-end to NodeJS back-end using express and multer. I will omit all validations to keep it short & simple.

### What is Multer

Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files. It is written on top of busboy for maximum efficiency.
Multer adds a body object and a file or files object to the request object. The body object contains the values of the text fields of the form, the file or files object contains the files uploaded via the form.

## Frontend

We will use create react app as a boilerplate

`````bash
mkdir imgUploadExample && cd imgUploadExample
npx install create-react-app frontend
```


Once installation completed we should see App.js file in frontend folder.

We will start first with creating a simple form where we can upload our image.


```javascript
return (
    <div className='App'>
      <h1>Upload to server</h1>
      {image.preview && <img src={image.preview} width='100' height='100' />}
      <hr></hr>
      <form onSubmit={handleSubmit}>
        <input type='file' name='file' onChange={handleFileChange}></input>
        <button type='submit'>Submit</button>
      </form>
      {status && <h4>{status}</h4>}
    </div>
  )
```


We will need to create two functions

**handleFileChange** -  triggered when file is uploaded, displays an image preview & stores our image data in the state.

**handleSubmit** - let us submit the image to the server.


```javascript
 function App() {
  const [image, setImage] = useState({ preview: '', data: '' })
  const [status, setStatus] = useState('')
  const handleSubmit = async (e) => {
    e.preventDefault()
    let formData = new FormData()
    formData.append('file', image.data)
    const response = await fetch('http://localhost:5000/image', {
      method: 'POST',
      body: formData,
    })
    if (response) setStatus(response.statusText)
  }

  const handleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    }
    setImage(img)
  }
```
 Once we start react app with npm run start we should see form with select & submit button.


![Alt text](https://i.imgur.com/EUad0B8.png"running server")


**Backend**

Now we going to create node application that will handle our POST request with image data send from the fronted. Once image is received it will save it our working directory.

To create new directory run command
````bash
mkdir backend && cd backend && mkdir images
```
then we initialize our application with npm init

We will install few required packages by running command
````bash
npm install express cors multer
```

**Our working directories should look like this**

````bash
├── backend
│   ├── app.js
│   ├── node_modules
|   ├── images
│   ├── package.json
│   └── package-lock.json
└── frontend
    ├── node_modules
    ├── package.json
    ├── public
    ├── README.md
    ├── src
    └── yarn.lock
```
**Multer** is a middleware that will let us handle multipart/form data sent from our frontend form.

**Cors** will let us accept cross origin request from our frontend to backend.

```javascript
const express = require('express')
const app = express()
const port = 5000
const cors = require('cors')
const multer = require('multer')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images/')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})

const upload = multer({ storage: storage })

app.use(cors())

app.post('/image', upload.single('file'), function (req, res) {
  res.json({})
})

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})

```
We initialized multer storage, now received images will be stored at backend/images with original filename.

Start backend with
````bash
 node app.js
```
 Go to the frontend & upload an image.

![Alt text](https://i.imgur.com/HJICsbH.png"upload OK")

Thanks for reading hope someone will find it useful :)

[Github repo](https://github.com/przpiw/imageUpload)
`````
