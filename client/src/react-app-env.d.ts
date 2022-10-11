/// <reference types="react-scripts" />

// Complete version of the book with all properties.
interface CompleteBook {
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
    add: boolean,
}

interface Thumbnail {
    smallThumbnail: string,
    thumbnail: string
}

interface Identifier {
    type: string,
    identifier: string
}
