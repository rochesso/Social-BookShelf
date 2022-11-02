import axios from "axios";
import { getUserData } from "./userData.model";

// convert the information from google api to a book.
const createBook = (item: GoogleBookAPI) => {
  const info = item.volumeInfo;
  const description = info.description || "";

  const book: NewBook = {
    googleId: item.id,
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
    lastModified: new Date(),
    status: {
      currentPage: 0,
      reading: "notStarted",
      isFavorite: false,
      rate: 1,
    },
  };
  return book;
};

// Search for books using google books api.
const searchBooks = async (q: string, searchType: string, id?: string) => {
  const key = process.env.GOOGLE_BOOKS_KEY;
  const googleApi = process.env.GOOGLE_BOOKS_API;
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

  // send a get request only if googleApi and key are specified in .env
  if (googleApi && key) {
    const result = await axios.get(googleApi, { params });
    let userBooks: CompleteBook[] = [];
    if (id) {
      const userData = await getUserData(id);
      if (userData) {
        userBooks = userData.books;
      }
    }

    if (result.status !== 200) {
      console.log("We got a problem while searching for the books.");
      throw new Error("Search failed");
    }

    let searchResults: NewBook[] = [];
    let error = null;
    // if any book is found googleAPI returns an object with an 'items' property
    if (result.data.items) {
      if (result.data.items.length > 0) {
        for (const item of result.data.items) {
          // Check if user already has the book added to their collection.
          const isBookAdded = userBooks.some(
            (book) => book.googleId === item.id
          );
          if (!isBookAdded) {
            const newBook = createBook(item);
            // Google Api sometimes return duplicated books with same id.
            let isBookDuplicated = searchResults.some((item) => {
              return item.googleId === newBook.googleId;
            });
            if (!isBookDuplicated) {
              // Only return books with cover images.
              if (newBook.imageLinks) {
                searchResults.push(newBook);
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
  }
};

export { searchBooks };
