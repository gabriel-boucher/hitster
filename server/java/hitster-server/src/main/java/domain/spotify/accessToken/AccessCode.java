package domain.spotify.accessToken;

public record AccessCode(String accessCode) {
    @Override
    public String toString() {
        return accessCode;
    }
}
