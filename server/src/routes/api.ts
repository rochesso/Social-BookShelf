import express from 'express';

import googleApiRouter from './googleApi/googleApi.router';
import booksRouter from './books/books.router';

const api = express.Router();

api.use('/googleApi', googleApiRouter);
api.use('/books', booksRouter);

export default api;