package infrastructure.playback.repository;

import com.fasterxml.jackson.databind.ObjectMapper;
import domain.spotify.accessToken.AccessToken;
import domain.spotify.playback.DeviceId;
import domain.spotify.playback.PlaybackRepository;
import domain.spotify.playback.PlaybackState;
import infrastructure.playback.dto.getPlaybackState.GetPlaybackStateSpotifyDto;
import infrastructure.playback.exception.*;
import infrastructure.playback.mapper.GetPlaybackStateSpotifyMapper;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class SpotifyApiPlaybackRepository implements PlaybackRepository {
    private static final String BASE_URL = "https://api.spotify.com/v1/me/player";

    private final GetPlaybackStateSpotifyMapper getPlaybackStateMapper;
    private final ObjectMapper objectMapper;
    private final HttpClient httpClient = HttpClient.newHttpClient();

    public SpotifyApiPlaybackRepository(GetPlaybackStateSpotifyMapper getPlaybackStateMapper, ObjectMapper objectMapper) {
        this.getPlaybackStateMapper = getPlaybackStateMapper;
        this.objectMapper = objectMapper;
    }

    @Override
    public void play(AccessToken accessToken, DeviceId deviceId) {
        try {
            String uri = BASE_URL + "/play?device_id=" + deviceId.toString();
            HttpRequest request = buildPutRequest(accessToken, uri);
            httpClient.send(request, HttpResponse.BodyHandlers.ofString());
        } catch (Exception e) {
            throw new SpotifyApiPlayException(deviceId);
        }
    }

    @Override
    public void pause(AccessToken accessToken, DeviceId deviceId) {
        try {
            String uri = BASE_URL + "/pause?device_id=" + deviceId.toString();
            HttpRequest request = buildPutRequest(accessToken, uri);
            httpClient.send(request, HttpResponse.BodyHandlers.ofString());
        } catch (Exception e) {
            throw new SpotifyApiPauseException(deviceId);
        }
    }

    @Override
    public void setVolume(AccessToken accessToken, DeviceId deviceId, int volumePercent) {
        try {
            String uri = BASE_URL + "/volume?volume_percent=" + volumePercent + "&device_id=" + deviceId.toString();
            HttpRequest request = buildPutRequest(accessToken, uri);
            httpClient.send(request, HttpResponse.BodyHandlers.ofString());
        } catch (Exception e) {
            throw new SpotifyApiSetVolumeException(deviceId);
        }
    }

    @Override
    public void seekToPosition(AccessToken accessToken, DeviceId deviceId, int positionMs) {
        try {
            String uri = BASE_URL + "/seek?position_ms=" + positionMs + "&device_id=" + deviceId.toString();
            HttpRequest request = buildPutRequest(accessToken, uri);
            httpClient.send(request, HttpResponse.BodyHandlers.ofString());
        } catch (Exception e) {
            throw new SpotifyApiSeekToPositionException(deviceId);
        }
    }

    @Override
    public PlaybackState getPlaybackState(AccessToken accessToken, DeviceId deviceId) {
        try {
            String uri = BASE_URL + "?device_id=" + deviceId.toString();
            HttpRequest request = buildGetRequest(accessToken, uri);
            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

            GetPlaybackStateSpotifyDto dto = objectMapper.readValue(response.body(), GetPlaybackStateSpotifyDto.class);
            return getPlaybackStateMapper.toDomain(dto);
        } catch (Exception e) {
            throw new SpotifyApiGetPlaybackStateException(deviceId);
        }
    }

    private HttpRequest buildGetRequest(AccessToken accessToken, String uri) {
        return HttpRequest.newBuilder()
                .uri(URI.create(uri))
                .header("Authorization", "Bearer " + accessToken.id())
                .GET()
                .build();
    }

    private HttpRequest buildPutRequest(AccessToken accessToken, String uri) {
        return HttpRequest.newBuilder()
                .uri(URI.create(uri))
                .header("Authorization", "Bearer " + accessToken.id())
                .PUT(HttpRequest.BodyPublishers.noBody())
                .build();
    }
}
