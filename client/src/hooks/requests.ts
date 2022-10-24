import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

// Search books on Google books api.
const httpSearchBooksGoogleApi = async (text: string, type: string) => {
  const userId = sessionStorage.getItem("user");
  const config = {
    params: {
      // q is the searched text
      q: text,
      searchType: type,
    },
    headers: {
      userId: userId,
    },
  };

  return await axios.get(`${API_URL}/googleApi/search`, config);
};

// Get all user books
const httpGetAllBooks = async () => {
  const userId = sessionStorage.getItem("user");
  try {
    if (userId) {
      const response = await fetch(`${API_URL}/user/books/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return await response.json();
    }
  } catch (err) {
    return {
      ok: false,
    };
  }
};
// Add a book to the database.
const httpAddBook = async (book: CompleteBook) => {
  const userId = sessionStorage.getItem("user");
  try {
    const result = await fetch(`${API_URL}/user/books/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ book }),
    });
    const data = await result.json();
    return data;
  } catch (err) {
    return {
      ok: false,
    };
  }
};
// Remove a book from the database.
const httpRemoveBook = async (book: CompleteBook) => {
  const userId = sessionStorage.getItem("user");
  const bookId = book._id;
  try {
    const result = await fetch(`${API_URL}/user/books/${userId}/${bookId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await result.json();
    return data;
  } catch (err) {
    return {
      ok: false,
    };
  }
};
// Update a book from database.
const httpUpdateBook = async (book: CompleteBook) => {
  const userId = sessionStorage.getItem("user");
  try {
    const result = await fetch(`${API_URL}/user/books/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ book }),
    });
    const data = await result.json();
    return data;
  } catch (err) {
    return {
      ok: false,
    };
  }
};
// Add a user to the database.
const httpAddUser = async (user: User) => {
  try {
    const response = await fetch(`${API_URL}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return await response.json();
  } catch (err) {
    return {
      ok: false,
    };
  }
};
// login a user from database.
const httpLoginUser = async (email: string) => {
  try {
    const response = await fetch(`${API_URL}/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        email: email,
      },
    });
    return await response.json();
  } catch (err) {
    return {
      ok: false,
    };
  }
};
// Get user configuration from database
const httpGetConfig = async () => {
  const userId = sessionStorage.getItem("user");
  try {
    if (userId) {
      const response = await fetch(`${API_URL}/user/config/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return await response.json();
    }
  } catch (err) {
    return {
      ok: false,
    };
  }
};

export {
  // googleApi
  httpSearchBooksGoogleApi,
  //user
  httpAddUser,
  httpLoginUser,
  // user books
  httpGetAllBooks,
  httpRemoveBook,
  httpAddBook,
  httpUpdateBook,
  // user config
  httpGetConfig,
};
