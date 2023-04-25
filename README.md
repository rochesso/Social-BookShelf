# Social-BookShelf

To be part of my professional portfolio, I have created this full-stack application that highlights my expertise in React, Redux, TypeScript, OAuth 2.0, and NodeJS technologies. This project reflects my passion for technology and my dedication to enhancing my skills in full-stack development. As a practice project, it demonstrates my ability to deliver high-quality products and my commitment to staying current with the latest industry trends and advancements.

### Description
Social Bookshelf is a website where you can find books, add them to your collection, rate them, mark them as favorites, update your reading progress and save your current page. It's like a virtual bookshelf where you can keep track of all the books you read.

In addition, Social Bookshelf allows you to browse the reading choices of other users, follow their accounts, and add their literary picks to your personal collection.

## Initial Configuration
### Server Folder
As this project uses mongodb database, google books api and google authentication, you will need to configure the following variables in a `.env` file inside the server folder:

> Obs.: I will leave the variables with some examples but you need to change with your details.

 * Port for the server:
``` bash
PORT=8000
```

* MongoDB database:
``` bash
MONGO_URL='mongodb://localhost:27017/social-bookshelf'
```
> MONGO_URL can be a local database or MongoDB Atlas.

* URL where your front end is running:
``` bash
CLIENT_URL='http://your-react-client.com' or 'http://localhost:3000'
```

* [Google books api](https://developers.google.com/books/docs/v1/using?hl=en)
``` bash
GOOGLE_BOOKS_KEY='type your key here'
```
``` bash
GOOGLE_BOOKS_API='https://www.googleapis.com/books/v1/volumes'
```

* [Google authentication](https://developers.google.com/identity/protocols/oauth2?hl=en)
``` bash
GOOGLE_CLIENT_ID='Your google client id'
```
``` bash
GOOGLE_CLIENT_SECRET='Your google client secret'
```

* Cookie keys for cookie-session:
``` bash
COOKIE_KEY_ONE='qWERadfAgASdgGHwhweR' 
```
``` bash
COOKIE_KEY_TWO='adsFsdfASDfasDFFSAfg'
```
> Obs.: These cookie keys can be any random sequence of characters.

### Client Folder
Inside the client folder you will need to create another `.env` file with the following variable:

* URL where your api/server is running:
``` bash
REACT_APP_API_URL='http://your-server.com:8000/api/v1' or 'http://localhost:8000/api/v1'
```

## Installation and Running

To install and run the project, execute the following commands in your terminal:

### Inside the client folder:

- npm install

- npm run build

#### Running the Client:

- npm run watch-client

### Inside the server folder:

- npm install

- npm run build

#### Running the server:

- npm run watch-ts

- npm run watch-server
