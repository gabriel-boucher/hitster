import {
    CLIENT_PORT,
    HOST_DEV,
    HOST_PROD,
    HTTP_SERVER_PORT, IS_PROD,
    WS_SERVER_PORT
} from "../environments/env.ts";

const buildUrl = (port: string) => IS_PROD
    ? `https://${HOST_PROD}-${port}.use.devtunnels.ms`
    : `http://${HOST_DEV}:${port}`;

export const CLIENT_URL = buildUrl(CLIENT_PORT);
export const HTTP_SERVER_URL = buildUrl(HTTP_SERVER_PORT);
export const WS_SERVER_URL = buildUrl(WS_SERVER_PORT);