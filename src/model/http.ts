export interface ApiResponse<T = any> {
    success: boolean;
    message: string;
    data: T;
  }
  
export interface ApiError {
    status: number;
    message: string;
    errors?: Record<string, string[]>;
}
  
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
  
export interface RequestOptions {
    method: HttpMethod;
    headers?: Record<string, string>;
    body?: any;
}