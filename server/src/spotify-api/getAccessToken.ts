import { CLIENT_ID, CLIENT_SECRET } from "../utils/constants";

interface TokenResponse {
    access_token: string;
    token_type: string;
    scope: string;
    expires_in: number;
    refresh_token: string;
}

export const getAccessToken = async (code: string): Promise<string> => {
    const params = new URLSearchParams();
    params.append("code", decodeURIComponent(code));
    params.append("redirect_uri", "http://127.0.0.1:8000"); // Must match the one used in /authorize
    params.append("grant_type", "authorization_code");

    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Basic " + Buffer.from(CLIENT_ID + ":" + CLIENT_SECRET).toString("base64")
      },
      body: params
    });
  
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Token exchange failed: ${code} ${response.status} - ${errorText}`);
    }
  
    const data = await response.json() as TokenResponse;
  
    return data.access_token;
  };