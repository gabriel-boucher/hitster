package interfaces.http.music;

import interfaces.dto.responseDto.EventResponse;
import interfaces.filter.auth.AuthContext;
import interfaces.http.deckMovement.cardMovement.dto.CardMovementRequest;
import interfaces.http.music.playlistProvider.PlaylistProviderHandler;
import interfaces.http.music.playlistProvider.dto.PlaylistProviderRequest;
import interfaces.http.music.searchPlaylists.SearchPlaylistsHandler;
import interfaces.http.music.searchPlaylists.SearchPlaylistsRequest;
import jakarta.ws.rs.*;
import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;

@Path("/api/games/{gameId}/music/")
public class MusicResource {

    private final SearchPlaylistsHandler searchPlaylistsHandler;
    private final PlaylistProviderHandler playlistProviderHandler;

    public MusicResource(SearchPlaylistsHandler searchPlaylistsHandler, PlaylistProviderHandler playlistProviderHandler) {
        this.searchPlaylistsHandler = searchPlaylistsHandler;
        this.playlistProviderHandler = playlistProviderHandler;
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public EventResponse searchPlaylists(
            @QueryParam("query") String query,
            @Context ContainerRequestContext requestContext) {
        String gameId = AuthContext.getGameId(requestContext);
        String playerId = AuthContext.getPlayerId(requestContext);

        System.out.println("Searching playlists with query: " + query + " for gameId: " + gameId + " and playerId: " + playerId);
        SearchPlaylistsRequest searchPlaylistsRequest = new SearchPlaylistsRequest(query);

        return searchPlaylistsHandler.handleEvent(gameId, playerId, searchPlaylistsRequest);
    }

    @POST
    @Path("auth/{auth-type}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public EventResponse addPlaylist(
            @PathParam("auth-type") String authType,
            PlaylistProviderRequest playlistProviderRequest,
            @Context ContainerRequestContext requestContext) {
        String gameId = AuthContext.getGameId(requestContext);
        String playerId = AuthContext.getPlayerId(requestContext);

        System.out.println("Auth type " + authType + " for gameId: " + gameId + " by playerId: " + playerId);

        return playlistProviderHandler.handleEvent(gameId, playerId, authType, playlistProviderRequest);
    }
}
