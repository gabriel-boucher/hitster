package interfaces.http.playlist;

import interfaces.dto.responseDto.EventResponse;
import interfaces.filter.auth.AuthContext;
import interfaces.http.playlist.addPlaylist.AddPlaylistHandler;
import interfaces.http.playlist.addPlaylist.dto.AddPlaylistRequest;
import interfaces.http.playlist.removePlaylist.RemovePlaylistHandler;
import interfaces.http.playlist.removePlaylist.dto.RemovePlaylistRequest;
import jakarta.ws.rs.*;
import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;

@Path("/api/games/{gameId}/playlists/")
public class PlaylistResource {

    private final AddPlaylistHandler addPlaylistHandler;
    private final RemovePlaylistHandler removePlaylistHandler;

    public PlaylistResource(AddPlaylistHandler addPlaylistHandler, RemovePlaylistHandler removePlaylistHandler) {
        this.addPlaylistHandler = addPlaylistHandler;
        this.removePlaylistHandler = removePlaylistHandler;
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public EventResponse addPlaylist(
            AddPlaylistRequest addPlaylistRequest,
            @Context ContainerRequestContext requestContext) {
        String gameId = AuthContext.getGameId(requestContext);
        String playerId = AuthContext.getPlayerId(requestContext);

        System.out.println("Add playlist for gameId: " + gameId + " by playerId: " + playerId);

        return addPlaylistHandler.handleEvent(gameId, playerId, addPlaylistRequest);
    }

    @DELETE
    @Path("{playlistId}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public EventResponse removePlaylist(
            @PathParam("playlistId") String playlistId,
            @Context ContainerRequestContext requestContext) {
        String gameId = AuthContext.getGameId(requestContext);
        String playerId = AuthContext.getPlayerId(requestContext);

        System.out.println("Remove playlistId: " + playlistId + " for gameId: " + gameId + " by playerId: " + playerId);
        RemovePlaylistRequest removePlaylistRequest = new RemovePlaylistRequest(playlistId);

        return removePlaylistHandler.handleEvent(gameId, playerId, removePlaylistRequest);
    }
}
