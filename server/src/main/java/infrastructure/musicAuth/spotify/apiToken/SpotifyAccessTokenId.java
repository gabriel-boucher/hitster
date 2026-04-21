package infrastructure.musicAuth.spotify.apiToken;

public record SpotifyAccessTokenId(String id) {
    @Override
    public String toString() {
        return id;
    }
}
