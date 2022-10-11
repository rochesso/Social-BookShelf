import axios from 'axios';

const searchBooks = async (q: string, searchType: string) => {
    const key = process.env.GOOGLE_BOOKS_KEY;
    let params;
    if (searchType == 'title') {
        params = {
            // q is the searched text
            q: `intitle:${q}`,
            maxResults: 15,
            orderBy: 'relevance',
            langRestrict: 'en',
            key: key
        };
    } else if (searchType == 'author') {
        params = {
            // q is the searched text
            q: `inauthor:${q}`,
            maxResults: 15,
            langRestrict: 'en',
            orderBy: 'relevance',
            key: key
        };
    } else {
        params = {
            // q is the searched text
            q: q,
            maxResults: 15,
            langRestrict: 'en',
            orderBy: 'relevance',
            key: key
        };
    }
    const googleApi = `https://www.googleapis.com/books/v1/volumes`;
    const result = await axios.get(googleApi, {params});

    if (result.status !== 200) {
        console.log('We got a problem while searching for the books.');
        throw new Error('Search failed');
    }

    let booksResults: CompleteBook[] = [];
    let error = null;
    // if any book is found googleAPI returns an object with an 'items' property
    if (result.data.items) {
        if (result.data.items.length > 0) {
            for (const item of result.data.items) {
                const info = item.volumeInfo;
                const description = info.description || '';

                const book: CompleteBook = {
                    id: item.id,
                    title: info.title,
                    description: `${description.slice(0, 200)}...`,
                    authors: info.authors,
                    categories: info.categories,
                    isbn: info.industryIdentifiers,
                    imageLinks: info.imageLinks,
                    publishedDate: info.publishedDate,
                    pageCount: info.pageCount,
                    averageRating: info.averageRating,
                    language: info.language,
                    add: true,
                };
                booksResults.push(book);
            }
            // if no books are found
        } else {
            error = 'No books found!';
            return error;
        }
    } else {
        error = 'No books found!';
        return error;
    }
    return booksResults;
};

export {
    searchBooks
};