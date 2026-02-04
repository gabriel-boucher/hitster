package infrastructure.accessToken.repository;

import com.fasterxml.jackson.databind.ObjectMapper;
import domain.spotify.accessToken.AccessCode;
import domain.spotify.accessToken.AccessToken;
import domain.spotify.accessToken.AccessTokenId;
import domain.spotify.accessToken.AccessTokenRepository;
import infrastructure.accessToken.dto.AccessTokenSpotifyDto;
import infrastructure.accessToken.exception.AccessTokenException;
import infrastructure.accessToken.mapper.AccessTokenSpotifyMapper;

import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.util.Base64;

import static environments.Env.*;

public class SpotifyApiAccessTokenRepository implements AccessTokenRepository {
    private static final String TOKEN_URL = "https://accounts.spotify.com/api/token";
    private static final String REDIRECT_URI = "http://" + HOST + ":" + CLIENT_PORT;
    private static final String GRANT_TYPE_CODE = "authorization_code";
    private static final String GRANT_TYPE_REFRESH = "refresh_token";

    private final AccessTokenSpotifyMapper mapper;
    private final ObjectMapper objectMapper;
    private final HttpClient httpClient = HttpClient.newHttpClient();

    public SpotifyApiAccessTokenRepository(AccessTokenSpotifyMapper mapper, ObjectMapper objectMapper) {
        this.mapper = mapper;
        this.objectMapper = objectMapper;
    }

    @Override
    public AccessToken getAccessTokenByAccessCode(AccessCode accessCode) {
        try {
            String body = buildCodeRequestBody(accessCode);
            HttpRequest request = buildTokenRequest(body);
            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

            AccessTokenSpotifyDto dto = objectMapper.readValue(response.body(), AccessTokenSpotifyDto.class);

            return mapper.toDomain(dto);
        } catch (Exception e) {
            throw new AccessTokenException(accessCode);
        }
    }

    @Override
    public AccessToken getAccessTokenByRefreshId(AccessTokenId refreshId) {
        try {
            String body = buildRefreshRequestBody(refreshId);
            HttpRequest request = buildTokenRequest(body);
            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

            AccessTokenSpotifyDto dto = objectMapper.readValue(response.body(), AccessTokenSpotifyDto.class);

            return mapper.toDomain(dto);
        } catch (Exception e) {
            throw new AccessTokenException(refreshId);
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

    private String buildCodeRequestBody(AccessCode accessCode) {
        return "code=" + URLEncoder.encode(accessCode.toString(), StandardCharsets.UTF_8)
                + "&redirect_uri=" + URLEncoder.encode(REDIRECT_URI, StandardCharsets.UTF_8)
                + "&grant_type=" + URLEncoder.encode(GRANT_TYPE_CODE, StandardCharsets.UTF_8);
    }

    private String buildRefreshRequestBody(AccessTokenId refreshId) {
        return "refresh_token=" + URLEncoder.encode(refreshId.toString(), StandardCharsets.UTF_8)
                + "&grant_type=" + URLEncoder.encode(GRANT_TYPE_REFRESH, StandardCharsets.UTF_8);
    }
}
