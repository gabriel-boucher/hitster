package interfaces.rest.spotify;

import application.SpotifyAppService;
import domain.spotify.Playlist;
import domain.spotify.accessToken.AccessToken;
import domain.spotify.accessToken.AccessTokenId;
import interfaces.rest.spotify.getAccessToken.GetAccessTokenMapper;
import interfaces.rest.spotify.getAccessToken.dto.GetAccessTokenData;
import interfaces.rest.spotify.getAccessToken.dto.GetAccessTokenResponse;
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
    private final GetAccessTokenMapper getAccessTokenMapper;

    public SpotifyResource(SpotifyAppService spotifyAppService, SearchPlaylistMapper searchPlaylistMapper, GetAccessTokenMapper getAccessTokenMapper) {
        this.spotifyAppService = spotifyAppService;
        this.searchPlaylistMapper = searchPlaylistMapper;
        this.getAccessTokenMapper = getAccessTokenMapper;
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

    @GET
    @Path("access-token")
    @Produces(MediaType.APPLICATION_JSON)
    public GetAccessTokenResponse getAccessToken(
            @HeaderParam("x-room-id") String roomId,
            @HeaderParam("x-player-id") String playerId
    ) {
        GetAccessTokenData data = getAccessTokenMapper.toDomain(roomId, playerId);
        AccessToken accessToken = spotifyAppService.getAccessToken(data.roomId(), data.playerId());

        return getAccessTokenMapper.toDto(accessToken);
    }
}
