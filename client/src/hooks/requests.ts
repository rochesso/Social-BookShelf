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
      id: userId,
    },
  };

  return await axios.get(`${API_URL}/googleapi/search`, config);
};

// Add a book to the database.
const httpAddBook = async (book: CompleteBook) => {
  const userId = sessionStorage.getItem("user");
  try {
    const result = await fetch(`${API_URL}/userBooks/add`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ book: book, id: userId }),
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
  try {
    const result = await fetch(`${API_URL}/userBooks/remove`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ book: book, id: userId }),
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
    const response = await fetch(`${API_URL}/user/add`, {
      method: "post",
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

const httpLoginUser = async (email: string) => {
  try {
    const response = await fetch(`${API_URL}/user/login`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    return await response.json();
  } catch (err) {
    return {
      ok: false,
    };
  }
};

const httpGetAllBooks = async () => {
  const userId = sessionStorage.getItem("user");
  try {
    if (userId) {
      const response = await fetch(`${API_URL}/userBooks`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          id: userId,
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

const httpGetConfig = async () => {
  const userId = sessionStorage.getItem("user");
  try {
    if (userId) {
      const response = await fetch(`${API_URL}/userConfig`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          id: userId,
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
  httpAddBook,
  httpSearchBooksGoogleApi,
  httpAddUser,
  httpLoginUser,
  httpGetAllBooks,
  httpRemoveBook,
  httpGetConfig,
};
