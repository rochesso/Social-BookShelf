# Social-BookShelf
Full stack application developed by me for practice purposes and to be part of my portfolio. On this project I focused more on the functionality than the design.

## Installation
### Server Folder
As this project uses mongodb database, google books api and google authentication, you will need to configure the following variables in a '.env' file inside de server folder:

Obs.: I will leave the variables with some examples but you need to change with your details.

#### Port for the server:

PORT=8000

#### MongoDB database:

MONGO_URL='mongodb://localhost:27017/social-bookshelf'

MONGO_URL can be a local database or MongoDB Atlas.

#### URL where your front end is running:

CLIENT_URL='http://your-react-client.com/' or 'http://localhost:3000'

#### Google books api: (https://developers.google.com/books/docs/v1/using?hl=en)

GOOGLE_BOOKS_KEY='type your key here'

GOOGLE_BOOKS_API='https://www.googleapis.com/books/v1/volumes'

#### Google authentication: (https://developers.google.com/identity/protocols/oauth2?hl=en)

GOOGLE_CLIENT_ID='Your google client id'

GOOGLE_CLIENT_SECRET='Your google client secret'

### Client Folder
Inside the client folder you will need to create another '.env' file with the following variable:

#### URL where your api/server is running:

REACT_APP_API_URL='http://your-server.com:8000/api/v1' or 'http://localhost:8000/api/v1'

## Installation and Running

To install the project run the following commands:

### Inside the client folder:

- npm install

- npm run build

#### Running

- npm run watch-client

### Inside the server folder:

- npm install

- npm run build

#### Running

- npm run watch-ts

- npm run watch-server
