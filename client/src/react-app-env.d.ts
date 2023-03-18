/// <reference types="react-scripts" />

// Enums
enum ReadingStatus {
  notStarted = "notStarted",
  started = "started",
  finished = "finished",
  gaveUp = "gaveUp",
}

enum SortPreferences {
  lastModified = "lastModified",
  title = "title",
  author = "author",
  timeAdded = "timeAdded",
}

// User
interface User {
  googleId?: string;
  _id?: ObjectId;
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  picture: string;
  lastLogon: Date;
}

// Data for a single user.
interface UserData {
  user: User._id;
  books: CompleteBook[];
  config: Config;
}

interface SocialUser {
  user: User;
  books: CompleteBook[];
  friends: User[];
}

interface Config {
  sortPreference: SortPreferences;
}

type Filter = ReadingStatus | "all" | "favorites";

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
  timeAdded: Date | string;
  status: Status;
}

interface Status {
  currentPage: number;
  reading: ReadingStatus;
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
