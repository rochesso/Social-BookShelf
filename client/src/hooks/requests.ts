import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Search books on Google books api.
const httpSearchBooksGoogleApi = async (text: string, type: string) => {
    const params = {
        // q is the searched text
        q: text,
        searchType: type
    };
    return await axios.get(`${API_URL}/googleapi/search`, {params});
};

// Add a book to the database.
const httpAddBook = async (book: CompleteBook) => {
    try {
        return await fetch(`${API_URL}/books`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(book),
        });
    } catch (err) {
        return {
            ok: false,
        };
    }
};

export {httpAddBook, httpSearchBooksGoogleApi};