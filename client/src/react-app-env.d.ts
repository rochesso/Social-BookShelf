/// <reference types="react-scripts" />

// User
interface User {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
}

// Data for a single user.
interface UserData {
  user: User._id;
  books: CompleteBook[];
  config: {
    sortPreference: string;
  };
}

// Complete version of the book with all properties.
interface CompleteBook {
  _id?: string;
  id: string;
  title: string;
  description: string;
  authors: string[];
  categories: string[];
  industryIdentifiers: Identifier[];
  imageLinks: Thumbnail;
  publishedDate: string;
  pageCount: number;
  averageRating: number;
  language: string;
  isAdded: boolean;
  lastModified: Date;
  status: {
    currentPage: number;
    reading: "notStarted" | "started" | "finished" | "gaveUp";
    isFavorite: boolean;
  };
}

interface Thumbnail {
  smallThumbnail: string;
  thumbnail: string;
}

// most common identifier is the ISBN
interface Identifier {
  type: string;
  identifier: string;
}
