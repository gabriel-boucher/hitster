package infrastructure.musicAuth.spotify.apiToken;

public record SpotifyAccessCode(String accessCode) {
    @Override
    public String toString() {
        return accessCode;
    }
}
