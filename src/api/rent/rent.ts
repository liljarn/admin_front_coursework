import { apiInstance } from '../base';

// Базовый URL для работы с арендой
const BASE_URL = 'rent';

// Принятие аренды книги по её идентификатору
export const acceptRent = (bookId: number): Promise<void> => {
    return apiInstance.post(`${BASE_URL}/${bookId}`, {});
};

// Завершение аренды книги по её идентификатору
export const endRent = (bookId: number): Promise<void> => {
    return apiInstance.delete(`${BASE_URL}/${bookId}`);
};
