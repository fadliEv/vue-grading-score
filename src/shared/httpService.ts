import { useFetch } from '@vueuse/core';
import type { ApiResponse, ApiError, RequestOptions } from '../model/http';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export class HttpError extends Error {
  constructor(public status: number, message: string, public errors?: Record<string, string[]>) {
    super(message);
    this.name = 'HttpError';
  }
}

const createRequestOptions = (method: RequestOptions['method'], body?: any): RequestOptions => {
  const options: RequestOptions = {
    method,
    headers: {
      'Content-Type': 'application/json',
    }
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  return options;
};

const handleResponse = async <T>(response: { data: { value: T | null }; error: { value: ApiError | null } }): Promise<T> => {
  try {
    if (response.error.value) {
      const errorData = response.error.value;
      throw new HttpError(
        errorData.status || 500,
        errorData.message || 'An unexpected error occurred',
        errorData.errors
      );
    }

    if (!response.data.value) {
      throw new HttpError(500, 'No data returned from API');
    }

    return response.data.value;
  } catch (error) {
    if (error instanceof HttpError) {
      throw error;
    }
    throw new HttpError(500, 'Network error occurred');
  }
};

export const getRequest = async <T>(url: string): Promise<T> => {
  const fetchPromise = useFetch<ApiResponse<T>>(`${API_BASE_URL}${url}`).get().json();
  const response = await fetchPromise; // Pastikan fetch selesai
  return handleResponse<T>(response);
};

export const postRequest = async <T>(url: string, body: any): Promise<T> => {
  const fetchPromise = useFetch<ApiResponse<T>>(`${API_BASE_URL}${url}`, createRequestOptions('POST', body)).post().json();
  const response = await fetchPromise;
  return handleResponse<T>(response);
};

export const putRequest = async <T>(url: string, body: any): Promise<T> => {
  const fetchPromise = useFetch<ApiResponse<T>>(`${API_BASE_URL}${url}`, createRequestOptions('PUT', body)).put().json();
  const response = await fetchPromise;
  return handleResponse<T>(response);
};

export const deleteRequest = async <T>(url: string): Promise<T> => {
  const fetchPromise = useFetch<ApiResponse<T>>(`${API_BASE_URL}${url}`).delete().json();
  const response = await fetchPromise;
  return handleResponse<T>(response);
};
