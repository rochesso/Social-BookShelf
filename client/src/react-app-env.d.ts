/// <reference types="react-scripts" />

// User
interface User {
  googleId?: string;
  _id?: ObjectId;
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
}

// Data for a single user.
interface UserData {
  user: User._id;
  books: CompleteBook[];
  config: Config;
}

interface Config {
  sortPreference: "recent" | "title" | "author";
}

interface Filter {
  filter: Status["reading"] | "all";
}

/////////////////////////////////////////////////////////////////////

// Complete version of the book with all properties.
interface CompleteBook {
  _id?: ObjectId;
  id?: string;
  googleId: string;
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
  lastModified: Date | string;
  status: Status;
}

interface Status {
  currentPage: number;
  reading: "notStarted" | "started" | "finished" | "gaveUp";
  isFavorite: boolean;
  rate: number;
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
