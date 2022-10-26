import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

// Search books on Google books api.
const httpSearchBooksGoogleApi = async (text: string, type: string) => {
  const config = {
    params: {
      // q is the searched text
      q: text,
      searchType: type,
    },
  };

  return await axios.get(`${API_URL}/googleApi/search`, config);
};

export {
  // googleApi
  httpSearchBooksGoogleApi,
};
