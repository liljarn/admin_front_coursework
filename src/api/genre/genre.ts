import { apiInstance, baseApiInstance } from '../base';

const BASE_URL = 'genre';

export const addGenre = (request: string): Promise<void> => {
    const formData = new FormData();
    formData.append('genre', request);
    return apiInstance.post(BASE_URL, formData);
};

export const getGenres = async (): Promise<any> => {
    try {
        return await baseApiInstance.get('genre');
    } catch (error) {
        return Promise.reject(error);
    }
};
