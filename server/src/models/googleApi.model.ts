import axios from "axios";
import { searchUserBooks } from "./userBooks.model";

const createBook = (item: GoogleBookAPI) => {
  const info = item.volumeInfo;
  const description = info.description || "";

  const book: CompleteBook = {
    id: item.id,
    title: info.title,
    description: `${description.slice(0, 200)}...`,
    authors: info.authors,
    categories: info.categories,
    industryIdentifiers: info.industryIdentifiers,
    imageLinks: info.imageLinks,
    publishedDate: info.publishedDate,
    pageCount: info.pageCount,
    averageRating: info.averageRating,
    language: info.language,
    isAdded: false,
  };
  return book;
};

const searchBooks = async (q: string, searchType: string, id: string) => {
  const key = process.env.GOOGLE_BOOKS_KEY;
  let generalParams = {
    maxResults: 15,
    orderBy: "relevance",
    langRestrict: "en",
    key: key,
  };

  let params;
  if (searchType == "title") {
    params = {
      // q is the searched text
      q: `intitle:${q}`,
      ...generalParams,
    };
  } else if (searchType == "author") {
    params = {
      // q is the searched text
      q: `inauthor:${q}`,
      ...generalParams,
    };
  } else {
    params = {
      // q is the searched text
      q: q,
      ...generalParams,
    };
  }

  const googleApi = `https://www.googleapis.com/books/v1/volumes`;
  const result = await axios.get(googleApi, { params });
  const user = await searchUserBooks(id);
  const userBooks = user?.books;

  if (result.status !== 200) {
    console.log("We got a problem while searching for the books.");
    throw new Error("Search failed");
  }

  let searchResults: CompleteBook[] = [];
  let error = null;
  // if any book is found googleAPI returns an object with an 'items' property
  if (result.data.items) {
    if (result.data.items.length > 0) {
      for (const item of result.data.items) {
        const isBookAdded = userBooks?.some((book) => book.id === item.id);
        if (!isBookAdded) {
          const book = createBook(item);
          // Google Api sometimes return duplicated books with same id.
          let isBookDuplicated = searchResults.some((item) => {
            return item.id === book.id;
          });
          if (!isBookDuplicated) {
            // Only return books with cover images.
            if (book.imageLinks) {
              searchResults.push(book);
            }
          }
        }
      }
      // if no books are found
    } else {
      error = "No books found!";
      return error;
    }
  } else {
    error = "No books found!";
    return error;
  }
  return searchResults;
};

export { searchBooks };
