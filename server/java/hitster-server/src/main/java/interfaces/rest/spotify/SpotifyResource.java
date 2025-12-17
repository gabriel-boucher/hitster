package interfaces.rest.spotify;

import application.SpotifyAppService;
import domain.spotify.Playlist;
import interfaces.rest.spotify.dto.SearchPlaylistData;
import interfaces.rest.spotify.dto.SearchPlaylistResponse;
import interfaces.rest.spotify.mapper.SearchPlaylistMapper;
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
    @Path("search-playlists/{roomId}/{playerId}")
    @Produces(MediaType.APPLICATION_JSON)
    public SearchPlaylistResponse searchPlaylists(@PathParam("roomId") String roomId, @PathParam("playerId") String playerId, @QueryParam("query") String query) {
        System.out.println("Searching playlists with query: " + query);

        SearchPlaylistData data = searchPlaylistMapper.toDomain(roomId, playerId);
        List<Playlist> playlists = spotifyAppService.searchPlaylists(data.roomId(), data.playerId(), query);

        return searchPlaylistMapper.toDto(playlists);
    }
}
