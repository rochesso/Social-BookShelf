interface User {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface UserData {
  user: User._id;
  books: CompleteBook[];
  config: Config;
}

interface Config {
  sortPreference: "recent" | "title" | "author";
}

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
  status: Status;
}

interface Status {
  currentPage: number;
  reading: "notStarted" | "started" | "finished" | "gaveUp";
  isFavorite: boolean;
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
