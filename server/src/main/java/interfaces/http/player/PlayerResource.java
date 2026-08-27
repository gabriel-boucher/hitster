package interfaces.http.player;

import interfaces.dto.responseDto.EventResponse;
import interfaces.filter.auth.AuthContext;
import interfaces.http.player.changePlayerMe.ChangePlayerMeHandler;
import interfaces.http.player.changePlayerMe.dto.ChangePlayerMeRequest;
import interfaces.http.player.removePlayer.RemovePlayerHandler;
import interfaces.http.player.removePlayer.dto.RemovePlayerRequest;
import jakarta.ws.rs.*;
import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;

@Path("/api/games/{gameId}/player/")
public class PlayerResource {

    private final ChangePlayerMeHandler changePlayerMeHandler;
    private final RemovePlayerHandler removePlayerHandler;

    public PlayerResource(
            ChangePlayerMeHandler changePlayerMeHandler,
            RemovePlayerHandler removePlayerHandler) {
        this.changePlayerMeHandler = changePlayerMeHandler;
        this.removePlayerHandler = removePlayerHandler;
    }

    @PATCH
    @Path("me")
    @Produces(MediaType.APPLICATION_JSON)
    public EventResponse updateMe(
            @QueryParam("name") String name,
            @QueryParam("color") String color,
            @Context ContainerRequestContext requestContext) {
        String gameId = AuthContext.getGameId(requestContext);
        String playerId = AuthContext.getPlayerId(requestContext);

        System.out.println("Update player for gameId: " + gameId + " by playerId: " + playerId);

        return changePlayerMeHandler.handleEvent(gameId, playerId, new ChangePlayerMeRequest(name, color));
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
