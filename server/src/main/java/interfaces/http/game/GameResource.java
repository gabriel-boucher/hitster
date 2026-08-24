package interfaces.http.game;
import interfaces.dto.responseDto.EventResponse;
import interfaces.filter.auth.AuthContext;
import interfaces.http.game.nextTurn.NextTurnHandler;
import jakarta.ws.rs.*;
import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
@Path("/api/games/{gameId}/turn/")
public class GameResource {

    private final NextTurnHandler nextTurnHandler;

    public GameResource(NextTurnHandler nextTurnHandler) {
        this.nextTurnHandler = nextTurnHandler;
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public EventResponse nextTurn(@Context ContainerRequestContext requestContext) {
        String gameId = AuthContext.getGameId(requestContext);
        String playerId = AuthContext.getPlayerId(requestContext);

        System.out.println("Next turn for gameId: " + gameId + " by playerId: " + playerId);

        return nextTurnHandler.handleEvent(gameId, playerId);
    }
}

