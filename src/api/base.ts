import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export const API_URL = 'http://localhost:8081/api/v1/management/';
export const BASE_API_URL = 'http://localhost:8081/api/v1/';

class ApiInstance {
    private axios: AxiosInstance;

    constructor() {
        this.axios = axios.create({
            baseURL: API_URL,
            timeout: 120000,
        });

        this.axios.interceptors.request.use(
            (config) => {
                config.headers['X-MANAGEMENT-API'] = 'BOOKER';
                return config;
            },
            (error) => Promise.reject(error)
        );
    }

    async get<T>(
        endpoint: string,
        options: AxiosRequestConfig = {}
    ): Promise<T> {
        try {
            const response: AxiosResponse<T> = await this.axios.get(endpoint, options);
            return response.data;
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async post<T, R = any>(
        endpoint: string,
        data: R,
        options: AxiosRequestConfig = {}
    ): Promise<T> {
        try {
            if (data instanceof FormData) {
                options.headers = {
                    ...options.headers,
                    'Content-Type': 'multipart/form-data',
                };
            }
            const response: AxiosResponse<T> = await this.axios.post(endpoint, data, options);
            return response.data;
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async delete<T>(
        endpoint: string,
        options: AxiosRequestConfig = {}
    ): Promise<T> {
        try {
            const response: AxiosResponse<T> = await this.axios.delete(endpoint, options);
            return response.data;
        } catch (error) {
            return Promise.reject(error);
        }
    }
}

export const apiInstance = new ApiInstance();

class BaseApiInstance {
    private axios: AxiosInstance;

    constructor() {
        this.axios = axios.create({
            baseURL: BASE_API_URL,
            timeout: 120000,
        });
    }

    async get<T>(endpoint: string, options: AxiosRequestConfig = {}): Promise<T> {
        try {
            const response: AxiosResponse<T> = await this.axios.get(endpoint, options);
            return response.data;
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async post<T, R = any>(
        endpoint: string,
        data: R,
        options: AxiosRequestConfig = {}
    ): Promise<T> {
        try {
            if (data instanceof FormData) {
                options.headers = {
                    ...options.headers,
                    'Content-Type': 'multipart/form-data',
                };
            }
            const response: AxiosResponse<T> = await this.axios.post(endpoint, data, options);
            return response.data;
        } catch (error) {
            return Promise.reject(error);
        }
    }
}

export const baseApiInstance = new BaseApiInstance();
