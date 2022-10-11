import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({

    id: {type: String, required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    authors: {type: [String], required: true, default: ['']},
    categories: {type: [String], required: true, default: ['']},
    isbn: {type: [Object], required: true},
    imageLinks: {type: Object, required: true},
    publishedDate: {type: String, required: true},
    pageCount: {type: Number, required: true},
    averageRating: {type: Number, required: true},
    language: {type: String, required: true},
    add: {type: Boolean, required: true},
});

export default mongoose.model('book', bookSchema, 'books');
