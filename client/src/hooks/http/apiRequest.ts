import axios, { AxiosRequestConfig } from "axios";
import { HTTP_SERVER_URL } from "../../config/url.ts";
import { getAuthHeaders } from "./authToken.ts";

export function apiUrl(path: string): string {
  return `${HTTP_SERVER_URL}${path}`;
}

export function authConfig(config: AxiosRequestConfig = {}): AxiosRequestConfig {
  return {
    ...config,
    headers: {
      ...config.headers,
      ...getAuthHeaders(),
    },
  };
}

export const api = {
  get: (path: string, config?: AxiosRequestConfig) =>
    axios.get(apiUrl(path), authConfig(config)),
  post: (path: string, data?: unknown, config?: AxiosRequestConfig) =>
    axios.post(apiUrl(path), data, authConfig(config)),
  patch: (path: string, data?: unknown, config?: AxiosRequestConfig) =>
    axios.patch(apiUrl(path), data, authConfig(config)),
  delete: (path: string, config?: AxiosRequestConfig) =>
    axios.delete(apiUrl(path), authConfig(config)),
};
