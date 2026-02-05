export const IS_PROD = import.meta.env.VITE_IS_PROD === "true" || false;
export const HOST_DEV = import.meta.env.VITE_HOST_DEV || 'localhost';
export const HOST_PROD = import.meta.env.VITE_HOST_PROD || 'localhost';
export const CLIENT_PORT = import.meta.env.VITE_CLIENT_PORT || "8000";
export const HTTP_SERVER_PORT = import.meta.env.VITE_HTTP_SERVER_PORT || "3000";
export const WS_SERVER_PORT = import.meta.env.VITE_SOCKET_SERVER_PORT || "3001";
