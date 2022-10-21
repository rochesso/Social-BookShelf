/// <reference types="react-scripts" />

// User
interface User {
    _id?: string,
    firstName: string,
    lastName: string,
    email: string,
}

// Complete version of the book with all properties.
interface CompleteBook {
    _id?: string,
    id: string,
    title: string,
    description: string,
    authors: string[],
    categories: string[],
    isbn: Identifier[],
    imageLinks: Thumbnail,
    publishedDate: string,
    pageCount: number,
    averageRating: number,
    language: string,
    isAdded: boolean,
}

interface Thumbnail {
    smallThumbnail: string,
    thumbnail: string
}

interface Identifier {
    type: string,
    identifier: string
}
