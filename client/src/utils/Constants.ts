export enum reducerCases {
  SET_SOCKET = "SET_SOCKET",
  SET_ROOM_ID = "SET_ROOM_ID",
  SET_GAME_STATE = "SET_GAME_STATE",
  SET_PLAYERS = "SET_PLAYERS",
  SET_ITEMS = "SET_ITEMS",
  SET_PLAYLISTS = "SET_PLAYLISTS",
  SET_IS_DRAGGING = "SET_IS_DRAGGING",
}

export const WHITE_COLOR__HEX = "#FFFFFF";
export const PINK_COLOR__HEX = "#FF00E0";



const CLIENT_PORT = import.meta.env.VITE_CLIENT_PORT || "8000";
const SERVER_PORT = parseInt(import.meta.env.VITE_SOCKET_SERVER_PORT || "4000");
const HOST_DEV = import.meta.env.VITE_HOST_DEV || 'localhost';
const HOST_PROD = import.meta.env.VITE_HOST_PROD || 'localhost';
const HOST_PROD_TUNNEl = "use.devtunnels.ms"

export enum ConnectionType {
  SERVER = "SERVER",
  CLIENT = "CLIENT",
}

export function getBaseUrl(connectionType: ConnectionType) {
  const isServer = connectionType === ConnectionType.SERVER;
  if (import.meta.env.VITE_IS_PROD === "true") {
    return `https://${HOST_PROD}-${isServer ? SERVER_PORT : CLIENT_PORT}.${HOST_PROD_TUNNEl}`
  } else {
    return `http://${HOST_DEV}:${isServer ? SERVER_PORT : CLIENT_PORT}`;
  }
}



const AUTH_BASE_URL = "https://accounts.spotify.com/authorize";
const CLIENT_ID = "eaae8989fbe84ba789d950152ed6e1b2";
const RESPONSE_TYPE = "code";
const REDIRECT_URI_DEV = `http://${HOST_DEV}:${CLIENT_PORT}`;
const REDIRECT_URI_PROD = `https://${HOST_PROD}-${CLIENT_PORT}.${HOST_PROD_TUNNEl}`;
const SCOPE = ["streaming", "user-read-email", "user-read-private", "user-library-read", "user-library-modify", "user-read-playback-state", "user-modify-playback-state"].join("%20");

export function getAuthUrl() {
  if (import.meta.env.VITE_IS_PROD === "true") {
    return `${AUTH_BASE_URL}?client_id=${CLIENT_ID}&response_type=${RESPONSE_TYPE}&redirect_uri=${REDIRECT_URI_PROD}&scope=${SCOPE}&show_dialog=true`;
  } else {
    return `${AUTH_BASE_URL}?client_id=${CLIENT_ID}&response_type=${RESPONSE_TYPE}&redirect_uri=${REDIRECT_URI_DEV}&scope=${SCOPE}&show_dialog=true`;
  }
}