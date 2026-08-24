package interfaces.http.player;

import interfaces.dto.responseDto.EventResponse;
import interfaces.filter.auth.AuthContext;
import interfaces.http.player.changePlayerColor.ChangePlayerColorHandler;
import interfaces.http.player.changePlayerName.ChangePlayerNameHandler;
import interfaces.http.player.changePlayerColor.dto.ChangePlayerColorRequest;
import interfaces.http.player.changePlayerName.dto.ChangePlayerNameRequest;
import interfaces.http.player.removePlayer.RemovePlayerHandler;
import interfaces.http.player.removePlayer.dto.RemovePlayerRequest;
import jakarta.ws.rs.*;
import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;

@Path("/api/games/{gameId}/player/")
public class PlayerResource {

    private final ChangePlayerNameHandler changePlayerNameHandler;
    private final ChangePlayerColorHandler changePlayerColorHandler;
    private final RemovePlayerHandler removePlayerHandler;

    public PlayerResource(
            ChangePlayerNameHandler changePlayerNameHandler,
            ChangePlayerColorHandler changePlayerColorHandler,
            RemovePlayerHandler removePlayerHandler) {
        this.changePlayerNameHandler = changePlayerNameHandler;
        this.changePlayerColorHandler = changePlayerColorHandler;
        this.removePlayerHandler = removePlayerHandler;
    }

    @PATCH
    @Path("change-player-name")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public EventResponse changePlayerName(
            ChangePlayerNameRequest changePlayerNameRequest,
            @Context ContainerRequestContext requestContext) {
        String gameId = AuthContext.getGameId(requestContext);
        String playerId = AuthContext.getPlayerId(requestContext);

        System.out.println("Change player name for gameId: " + gameId + " by playerId: " + playerId);

        return changePlayerNameHandler.handleEvent(gameId, playerId, changePlayerNameRequest);
    }

    @PATCH
    @Path("change-player-color")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public EventResponse changePlayerColor(
            ChangePlayerColorRequest changePlayerColorRequest,
            @Context ContainerRequestContext requestContext) {
        String gameId = AuthContext.getGameId(requestContext);
        String playerId = AuthContext.getPlayerId(requestContext);

        System.out.println("Change player color for gameId: " + gameId + " by playerId: " + playerId);

        return changePlayerColorHandler.handleEvent(gameId, playerId, changePlayerColorRequest);
    }

    @DELETE
    @Path("{playerToRemoveId}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public EventResponse removePlayer(
            @PathParam("playerToRemoveId") String playerToRemoveId,
            @Context ContainerRequestContext requestContext) {
        String gameId = AuthContext.getGameId(requestContext);
        String playerId = AuthContext.getPlayerId(requestContext);

        System.out.println("Remove player for gameId: " + gameId + " by playerId: " + playerId);
        RemovePlayerRequest removePlayerRequest = new RemovePlayerRequest(playerToRemoveId);

        return removePlayerHandler.handleEvent(gameId, playerId, removePlayerRequest);
    }
}
