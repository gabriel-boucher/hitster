package infrastructure.accessToken.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public record AccessTokenSpotifyDto(
        @JsonProperty("access_token") String id,
        @JsonProperty("expires_in") int expiresInSeconds,
        @JsonProperty("refresh_token") String refreshId
) {
}
