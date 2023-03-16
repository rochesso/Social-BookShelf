declare namespace Express {
  interface User {
    googleId: string;
    _id: ObjectId;
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    picture: string;
    lastLogon: Date;
  }
}

interface User extends Express.User {}

interface UserData {
  user: User._id;
  googleId: string;
  books: CompleteBook[];
  config: Config;
}

interface Config {
  sortPreference: "recent" | "title" | "author" | "added";
}

interface CompleteBook {
  _id: ObjectId;
  id: string;
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
  lastModified: Date;
  timeAdded: Date;
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

interface Identifier {
  type: string;
  identifier: string;
}

interface GoogleBookAPI {
  id: string;
  volumeInfo: CompleteBook;
}

interface NewUser {
  googleId?: string;
  firstName: string;
  lastName: string;
  email: string;
  picture: string;
  lastLogon: Date;
}

interface NewBook {
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
  lastModified: Date;
  timeAdded: Date;
  status: Status;
}
