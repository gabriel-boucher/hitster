package interfaces.rest.spotify;

import application.SpotifyAppService;
import domain.spotify.Playlist;
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
    @Path("search-playlists")
    @Produces(MediaType.APPLICATION_JSON)
    public SearchPlaylistResponse searchPlaylists(@QueryParam("query") String query) {
        System.out.println("Searching playlists with query: " + query);

        List<Playlist> playlists = spotifyAppService.searchPlaylists(query);

        return searchPlaylistMapper.toDto(playlists);
    }
}
