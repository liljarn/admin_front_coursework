import { apiInstance, baseApiInstance } from '../base';

const BASE_URL = 'author';

export const addAuthor = (authorName: string, authorPhoto: File): Promise<void> => {
    const formData = new FormData();
    formData.append('authorName', authorName);
    formData.append('authorPhoto', authorPhoto);

    return apiInstance.post(BASE_URL, formData);
};

export const getAuthors = async (page: number): Promise<any> => {
    try {
        return await baseApiInstance.get('author/list', { params: { page } });
    } catch (error) {
        return Promise.reject(error);
    }
};
