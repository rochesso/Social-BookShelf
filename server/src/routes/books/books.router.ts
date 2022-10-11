import express from 'express';

import {httpAddBook} from './books.controller';

const books = express.Router();

// - /books
books.post('/', httpAddBook);

export default books;