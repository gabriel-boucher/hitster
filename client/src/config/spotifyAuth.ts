import {CLIENT_URL} from "./url.ts";

const AUTH_BASE_URL = "https://accounts.spotify.com/authorize";
const CLIENT_ID = "eaae8989fbe84ba789d950152ed6e1b2";
const RESPONSE_TYPE = "code";
const REDIRECT_URI = CLIENT_URL;
const SCOPE = ["streaming", "user-read-email", "user-read-private", "user-library-read", "user-library-modify", "user-read-playback-state", "user-modify-playback-state"].join("%20");

export const SPOTIFY_AUTH_URL = `${AUTH_BASE_URL}?client_id=${CLIENT_ID}&response_type=${RESPONSE_TYPE}&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}&show_dialog=true`;