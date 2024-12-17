import { apiInstance } from '../base';
import { BookStatus, BookManagmentPage } from '../types';

const BASE_URL = 'book';

// Добавление новой книги
export const addNewBook = (authorId: number, request: FormData): Promise<void> => {
    return apiInstance.post(`${BASE_URL}/${authorId}`, request);
};

// Удаление книги по идентификатору
export const deleteBook = (bookId: number): Promise<void> => {
    return apiInstance.delete(`${BASE_URL}/${bookId}`);
};

// Получение страницы книг по статусу
export const getManagementBooksPageWithStatus = (
    status: BookStatus,
    page: number,
    bookName?: string,
    author?: string,
    genres?: number[]
): Promise<BookManagmentPage> => {
    return apiInstance.get(`${BASE_URL}/${status}`, {
        params: { page, bookName, author, genres }
    });
};

export const getManagementBooksPage = (
    page: number,
    bookName?: string,
    author?: string,
    genres?: number[]
): Promise<BookManagmentPage> => {
    const params: { [key: string]: any } = { page };

    if (bookName) {
        params.bookName = bookName;
    }
    if (author) {
        params.author = author;
    }
    if (genres && genres.length > 0) {
        params.genres = genres.join(',');
    }

    return apiInstance.get(BASE_URL, { params });
};
