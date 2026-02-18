package infrastructure.musicAuth.spotify.auth;

import com.fasterxml.jackson.databind.ObjectMapper;
import domain.room.RoomId;
import infrastructure.musicAuth.spotify.apiToken.SpotifyAccessCode;
import infrastructure.musicAuth.spotify.apiToken.SpotifyAccessToken;
import infrastructure.musicAuth.spotify.apiToken.SpotifyAccessTokenId;
import infrastructure.musicAuth.spotify.apiToken.SpotifyAccessTokenRepository;

import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.util.Base64;

import static environments.Env.*;

public class SpotifyAuthRepository {
    private static final String TOKEN_URL = "https://accounts.spotify.com/api/token";
    private static final String REDIRECT_URI = "http://" + HOST + ":" + CLIENT_PORT + "/spotify-callback";
    private static final String GRANT_TYPE_CODE = "authorization_code";
    private static final String GRANT_TYPE_REFRESH = "refresh_token";

    private final SpotifyAccessTokenRepository spotifyAccessTokenRepository;
    private final SpotifyAccessTokenMapper mapper;
    private final ObjectMapper objectMapper;
    private final HttpClient httpClient = HttpClient.newHttpClient();

    public SpotifyAuthRepository(SpotifyAccessTokenRepository spotifyAccessTokenRepository, SpotifyAccessTokenMapper mapper, ObjectMapper objectMapper) {
        this.spotifyAccessTokenRepository = spotifyAccessTokenRepository;
        this.mapper = mapper;
        this.objectMapper = objectMapper;
    }

    public void setSpotifyApiTokenByAccessCode(RoomId roomId, SpotifyAccessCode spotifyAccessCode) {
        if (spotifyAccessTokenRepository.getSpotifyApiTokenByRoomId(roomId) != null) {
            return;
        }
        try {
            String body = buildCodeRequestBody(spotifyAccessCode);
            HttpRequest request = buildTokenRequest(body);
            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

            SpotifyAccessTokenDto dto = objectMapper.readValue(response.body(), SpotifyAccessTokenDto.class);
            SpotifyAccessToken spotifyAccessToken = mapper.toDomain(dto);

            spotifyAccessTokenRepository.saveSpotifyApiToken(roomId, spotifyAccessToken);
        } catch (Exception e) {
            throw new SpotifyAccessTokenException(spotifyAccessCode);
        }
    }

    public SpotifyAccessToken setSpotifyApiTokenByRefreshId(RoomId roomId, SpotifyAccessTokenId refreshId) {
        try {
            String body = buildRefreshRequestBody(refreshId);
            HttpRequest request = buildTokenRequest(body);
            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

            SpotifyAccessTokenDto dto = objectMapper.readValue(response.body(), SpotifyAccessTokenDto.class);

            return mapper.toDomain(dto);
        } catch (Exception e) {
            throw new SpotifyAccessTokenException(refreshId);
        }
    }

    private HttpRequest buildTokenRequest(String body) {
        String basicAuthHeader = buildBasicRequestAuthHeader();

        return HttpRequest.newBuilder()
                .uri(URI.create(TOKEN_URL))
                .header("Content-Type", "application/x-www-form-urlencoded")
                .header("Authorization", "Basic " + basicAuthHeader)
                .POST(HttpRequest.BodyPublishers.ofString(body))
                .build();
    }

    private String buildBasicRequestAuthHeader() {
        String credentials = SPOTIFY_CLIENT_ID + ":" + SPOTIFY_CLIENT_SECRET;
        return Base64.getEncoder().encodeToString(credentials.getBytes(StandardCharsets.UTF_8));
    }

    private String buildCodeRequestBody(SpotifyAccessCode spotifyAccessCode) {
        return "code=" + URLEncoder.encode(spotifyAccessCode.toString(), StandardCharsets.UTF_8)
                + "&redirect_uri=" + URLEncoder.encode(REDIRECT_URI, StandardCharsets.UTF_8)
                + "&grant_type=" + URLEncoder.encode(GRANT_TYPE_CODE, StandardCharsets.UTF_8);
    }

    private String buildRefreshRequestBody(SpotifyAccessTokenId refreshId) {
        return "refresh_token=" + URLEncoder.encode(refreshId.toString(), StandardCharsets.UTF_8)
                + "&grant_type=" + URLEncoder.encode(GRANT_TYPE_REFRESH, StandardCharsets.UTF_8);
    }
}
