interface User {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface UserData {
  user: User._id;
  books: CompleteBook[];
  config: {
    sortPreference: string;
  };
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

interface Identifier {
  type: string;
  identifier: string;
}

interface GoogleBookAPI {
  id: string;
  volumeInfo: CompleteBook;
}
