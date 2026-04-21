package infrastructure.music.repository;

import com.fasterxml.jackson.databind.ObjectMapper;
import domain.game.item.card.Card;
import domain.music.Playlist;
import domain.music.PlaylistId;
import domain.music.MusicRepository;
import domain.room.RoomId;
import infrastructure.musicAuth.spotify.apiToken.SpotifyAccessToken;
import infrastructure.music.dto.getPlaylistItems.GetPlaylistItemsSpotifyDto;
import infrastructure.music.exception.getPlaylistItems.GetPlaylistItemsSpotifyException;
import infrastructure.music.mapper.getPlaylistItems.GetPlaylistItemsSpotifyMapper;
import infrastructure.music.exception.searchPlaylists.SearchPlaylistsSpotifyException;
import infrastructure.music.dto.searchPlaylists.SearchPlaylistsSpotifyDto;
import infrastructure.music.mapper.searchPlaylists.SearchPlaylistsSpotifyMapper;
import infrastructure.musicAuth.spotify.apiToken.SpotifyAccessTokenRepository;

import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class SpotifyMusicRepository implements MusicRepository {
    private static final String SEARCH_BASE_URL = "https://api.spotify.com/v1/search";
    private static final String PLAYLIST_BASE_URL = "https://api.spotify.com/v1/playlists";
    private static final String SEARCH_TYPE = "playlist";

    private final SpotifyAccessTokenRepository spotifyAccessTokenRepository;
    private final SearchPlaylistsSpotifyMapper searchPlaylistsSpotifyMapper;
    private final GetPlaylistItemsSpotifyMapper getPlaylistItemsSpotifyMapper;
    private final ObjectMapper objectMapper;
    private final HttpClient httpClient = HttpClient.newHttpClient();

    public SpotifyMusicRepository(SpotifyAccessTokenRepository spotifyAccessTokenRepository, SearchPlaylistsSpotifyMapper searchPlaylistsSpotifyMapper, GetPlaylistItemsSpotifyMapper getPlaylistItemsSpotifyMapper, ObjectMapper objectMapper) {
        this.spotifyAccessTokenRepository = spotifyAccessTokenRepository;
        this.searchPlaylistsSpotifyMapper = searchPlaylistsSpotifyMapper;
        this.getPlaylistItemsSpotifyMapper = getPlaylistItemsSpotifyMapper;
        this.objectMapper = objectMapper;
    }

    @Override
    public List<Playlist> searchPlaylistsByQuery(RoomId roomId, String query) {
        SpotifyAccessToken spotifyAccessToken = spotifyAccessTokenRepository.getSpotifyApiTokenByRoomId(roomId);
        try {
            String encoded = URLEncoder.encode(query, StandardCharsets.UTF_8);
            String uri = SEARCH_BASE_URL + "?q=" + encoded + "&type=" + SEARCH_TYPE;

            HttpRequest request = buildRequest(spotifyAccessToken, uri);
            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

            SearchPlaylistsSpotifyDto dto = objectMapper.readValue(response.body(), SearchPlaylistsSpotifyDto.class);

            return searchPlaylistsSpotifyMapper.toDomain(dto);
        } catch (Exception e) {
            throw new SearchPlaylistsSpotifyException(spotifyAccessToken, query);
        }
    }

    @Override
    public List<Card> getCardsByPlaylistId(RoomId roomId, List<PlaylistId> playlistIds) {
        SpotifyAccessToken spotifyAccessToken = spotifyAccessTokenRepository.getSpotifyApiTokenByRoomId(roomId);
        try {
            Set<Card> cards = new HashSet<>();

            for (PlaylistId playlistId : playlistIds) {
                int offset = 0;

                while (true) {
                    String uri = PLAYLIST_BASE_URL + "/" + playlistId.id() + "/tracks/?limit=50&offset=" + offset;

                    HttpRequest request = buildRequest(spotifyAccessToken, uri);
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
            throw new GetPlaylistItemsSpotifyException(spotifyAccessToken, playlistIds.getFirst());
        }
    }

    private HttpRequest buildRequest(SpotifyAccessToken spotifyAccessToken, String uri) {
        return HttpRequest.newBuilder()
                .uri(URI.create(uri))
                .header("Authorization", "Bearer " + spotifyAccessToken.id())
                .GET()
                .build();
    }
}
