package infrastructure.playlist.repository;

import com.fasterxml.jackson.databind.ObjectMapper;
import domain.spotify.Playlist;
import domain.spotify.PlaylistRepository;
import domain.spotify.accessToken.AccessToken;
import infrastructure.playlist.exception.SpotifyApiSearchPlaylistsException;
import infrastructure.playlist.dto.SearchPlaylistsSpotifyDto;
import infrastructure.playlist.mapper.SearchPlaylistsSpotifyMapper;

import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.util.List;

public class SpotifyApiPlaylistRepository implements PlaylistRepository {
    private static final String SEARCH_URL = "https://api.spotify.com/v1/search";
    private static final String SEARCH_TYPE = "playlist";

    private final SearchPlaylistsSpotifyMapper mapper;
    private final ObjectMapper objectMapper;
    private final HttpClient httpClient = HttpClient.newHttpClient();

    public SpotifyApiPlaylistRepository(SearchPlaylistsSpotifyMapper mapper, ObjectMapper objectMapper) {
        this.mapper = mapper;
        this.objectMapper = objectMapper;
    }

    @Override
    public List<Playlist> searchPlaylistsByQuery(AccessToken accessToken, String query) {
        try {
            HttpRequest request = buildSearchPlaylistRequest(accessToken, query);
            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

            SearchPlaylistsSpotifyDto dto = objectMapper.readValue(response.body(), SearchPlaylistsSpotifyDto.class);

            return mapper.toDomain(dto);
        } catch (Exception e) {
            throw new SpotifyApiSearchPlaylistsException(accessToken, query);
        }
    }

    private HttpRequest buildSearchPlaylistRequest(AccessToken accessToken, String query) {
        String encoded = URLEncoder.encode(query, StandardCharsets.UTF_8);
        String uri = SEARCH_URL + "?q=" + encoded + "&type=" + SEARCH_TYPE;

        return HttpRequest.newBuilder()
                .uri(URI.create(uri))
                .header("Authorization", "Bearer " + accessToken.id())
                .GET()
                .build();
    }
}
