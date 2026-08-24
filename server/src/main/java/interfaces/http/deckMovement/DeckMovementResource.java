package interfaces.http.deckMovement;

import interfaces.dto.responseDto.EventResponse;
import interfaces.filter.auth.AuthContext;
import interfaces.http.deckMovement.cardMovement.CardMovementHandler;
import interfaces.http.deckMovement.cardMovement.dto.CardMovementRequest;
import interfaces.http.deckMovement.tokenMovement.TokenMovementHandler;
import interfaces.http.deckMovement.tokenMovement.dto.TokenMovementRequest;
import jakarta.ws.rs.*;
import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;

@Path("/api/games/{gameId}/movements/")
public class DeckMovementResource {

    private final CardMovementHandler cardMovementHandler;
    private final TokenMovementHandler tokenMovementHandler;

    public DeckMovementResource(CardMovementHandler cardMovementHandler, TokenMovementHandler tokenMovementHandler) {
        this.cardMovementHandler = cardMovementHandler;
        this.tokenMovementHandler = tokenMovementHandler;
    }

    @POST
    @Path("cards/{card-movement}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public EventResponse cardMovement(
            @PathParam("card-movement") String cardMovement,
            CardMovementRequest cardMovementRequest,
            @Context ContainerRequestContext requestContext) {
        String gameId = AuthContext.getGameId(requestContext);
        String playerId = AuthContext.getPlayerId(requestContext);

        System.out.println("Card movement " + cardMovement + " for gameId: " + gameId + " by playerId: " + playerId);

        return cardMovementHandler.handleEvent(gameId, playerId, cardMovement, cardMovementRequest);
    }

    @POST
    @Path("tokens/{token-movement}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public EventResponse tokenMovement(
            @PathParam("token-movement") String tokenMovement,
            TokenMovementRequest tokenMovementRequest,
            @Context ContainerRequestContext requestContext) {
        String gameId = AuthContext.getGameId(requestContext);
        String playerId = AuthContext.getPlayerId(requestContext);

        System.out.println("Token movement " + tokenMovement + " for gameId: " + gameId + " by playerId: " + playerId);

        return tokenMovementHandler.handleEvent(gameId, playerId, tokenMovement, tokenMovementRequest);
    }
}
