const AUTH_TOKEN_KEY = "authToken";

export function getAuthToken(): string {
  return localStorage.getItem(AUTH_TOKEN_KEY) || "";
}

export function setAuthToken(token: string): void {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
}

export function clearAuthToken(): void {
  localStorage.removeItem(AUTH_TOKEN_KEY);
}

export function getAuthHeaders(): Record<string, string> {
  const token = getAuthToken();
  if (!token) return {};

  return { Authorization: `Bearer ${token}` };
}

type DecodedAuthToken = {
  playerId: string;
  gameId: string;
};

export function decodeAuthToken(token: string): DecodedAuthToken | null {
  try {
    const payload = token.split(".")[1];
    const json = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    const claims = JSON.parse(json);

    if (!claims.sub || !claims.gameId) return null;
    return { playerId: claims.sub, gameId: claims.gameId };
  } catch {
    return null;
  }
}
