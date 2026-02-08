package infrastructure.playlist.repository;

import com.fasterxml.jackson.databind.ObjectMapper;
import domain.game.item.card.Card;
import domain.spotify.playlist.Playlist;
import domain.spotify.playlist.PlaylistId;
import domain.spotify.playlist.PlaylistRepository;
import domain.spotify.accessToken.AccessToken;
import infrastructure.playlist.dto.getPlaylistItems.GetPlaylistItemsSpotifyDto;
import infrastructure.playlist.exception.getPlaylistItems.SpotifyApiGetPlaylistItemsException;
import infrastructure.playlist.mapper.getPlaylistItems.GetPlaylistItemsSpotifyMapper;
import infrastructure.playlist.exception.searchPlaylists.SpotifyApiSearchPlaylistsException;
import infrastructure.playlist.dto.searchPlaylists.SearchPlaylistsSpotifyDto;
import infrastructure.playlist.mapper.searchPlaylists.SearchPlaylistsSpotifyMapper;

import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class SpotifyApiPlaylistRepository implements PlaylistRepository {
    private static final String SEARCH_BASE_URL = "https://api.spotify.com/v1/search";
    private static final String PLAYLIST_BASE_URL = "https://api.spotify.com/v1/playlists";
    private static final String SEARCH_TYPE = "playlist";

    private final SearchPlaylistsSpotifyMapper searchPlaylistsSpotifyMapper;
    private final GetPlaylistItemsSpotifyMapper getPlaylistItemsSpotifyMapper;
    private final ObjectMapper objectMapper;
    private final HttpClient httpClient = HttpClient.newHttpClient();

    public SpotifyApiPlaylistRepository(SearchPlaylistsSpotifyMapper searchPlaylistsSpotifyMapper, GetPlaylistItemsSpotifyMapper getPlaylistItemsSpotifyMapper, ObjectMapper objectMapper) {
        this.searchPlaylistsSpotifyMapper = searchPlaylistsSpotifyMapper;
        this.getPlaylistItemsSpotifyMapper = getPlaylistItemsSpotifyMapper;
        this.objectMapper = objectMapper;
    }

    @Override
    public List<Playlist> searchPlaylistsByQuery(AccessToken accessToken, String query) {
        try {
            String encoded = URLEncoder.encode(query, StandardCharsets.UTF_8);
            String uri = SEARCH_BASE_URL + "?q=" + encoded + "&type=" + SEARCH_TYPE;

            HttpRequest request = buildRequest(accessToken, uri);
            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

            SearchPlaylistsSpotifyDto dto = objectMapper.readValue(response.body(), SearchPlaylistsSpotifyDto.class);

            return searchPlaylistsSpotifyMapper.toDomain(dto);
        } catch (Exception e) {
            throw new SpotifyApiSearchPlaylistsException(accessToken, query);
        }
    }

    @Override
    public List<Card> getCardsByPlaylistId(AccessToken accessToken, List<PlaylistId> playlistIds) {
        try {
            Set<Card> cards = new HashSet<>();

            for (PlaylistId playlistId : playlistIds) {
                int offset = 0;

                while (true) {
                    String uri = PLAYLIST_BASE_URL + "/" + playlistId.id() + "/tracks/?limit=50&offset=" + offset;

                    HttpRequest request = buildRequest(accessToken, uri);
                    HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

                    GetPlaylistItemsSpotifyDto dto = objectMapper.readValue(response.body(), GetPlaylistItemsSpotifyDto.class);

                    cards.addAll(getPlaylistItemsSpotifyMapper.toDomain(dto));

                    if (dto.items().size() < 50) {
                        break;
                    }
                    offset += 50;
                }
            }

            return cards.stream().toList();
        } catch (Exception e) {
            throw new SpotifyApiGetPlaylistItemsException(accessToken, playlistIds.getFirst());
        }
    }

    private HttpRequest buildRequest(AccessToken accessToken, String uri) {
        return HttpRequest.newBuilder()
                .uri(URI.create(uri))
                .header("Authorization", "Bearer " + accessToken.id())
                .GET()
                .build();
    }
}
