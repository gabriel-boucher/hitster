package domain.spotify.accessToken;

public record AccessTokenId(String id) {
    @Override
    public String toString() {
        return id;
    }
}
