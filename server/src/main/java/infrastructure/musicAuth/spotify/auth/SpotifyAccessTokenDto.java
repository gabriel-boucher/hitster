package infrastructure.musicAuth.spotify.auth;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public record SpotifyAccessTokenDto(
        @JsonProperty(value = "access_token", required = true) String id,
        @JsonProperty(value = "expires_in", required = true) int expiresInSeconds,
        @JsonProperty(value = "refresh_token", required = true) String refreshId
) {
}
