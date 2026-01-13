package interfaces.rest.spotify;

import application.SpotifyAppService;
import domain.spotify.Playlist;
import interfaces.rest.spotify.searchPlaylists.SearchPlaylistData;
import interfaces.rest.spotify.searchPlaylists.SearchPlaylistResponse;
import interfaces.rest.spotify.searchPlaylists.SearchPlaylistMapper;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;

import java.util.List;

@Path("/api/spotify/")
public class SpotifyResource {
    private final SpotifyAppService spotifyAppService;
    private final SearchPlaylistMapper searchPlaylistMapper;

    public SpotifyResource(SpotifyAppService spotifyAppService, SearchPlaylistMapper searchPlaylistMapper) {
        this.spotifyAppService = spotifyAppService;
        this.searchPlaylistMapper = searchPlaylistMapper;
    }

    @GET
    @Path("search-playlists")
    @Produces(MediaType.APPLICATION_JSON)
    public SearchPlaylistResponse searchPlaylists(
            @HeaderParam("x-room-id") String roomId,
            @HeaderParam("x-player-id") String playerId,
            @QueryParam("query") String query) {
        System.out.println("Searching playlists with query: " + query + " for roomId: " + roomId + " and playerId: " + playerId);

        SearchPlaylistData data = searchPlaylistMapper.toDomain(roomId, playerId);
        List<Playlist> playlists = spotifyAppService.searchPlaylists(data.roomId(), data.playerId(), query);

        return searchPlaylistMapper.toDto(playlists);
    }
}
