package interfaces.http.game;
import interfaces.dto.responseDto.EventResponse;
import interfaces.http.game.addCurrentCard.AddCurrentCardHandler;
import interfaces.http.game.addCurrentCard.dto.AddCurrentCardRequest;
import interfaces.http.game.addToken.AddTokenHandler;
import interfaces.http.game.addToken.dto.AddTokenRequest;
import interfaces.http.game.nextTurn.NextTurnHandler;
import interfaces.http.game.nextTurn.dto.NextTurnRequest;
import interfaces.http.game.removeCurrentCard.RemoveCurrentCardHandler;
import interfaces.http.game.removeCurrentCard.dto.RemoveCurrentCardRequest;
import interfaces.http.game.removeToken.RemoveTokenHandler;
import interfaces.http.game.removeToken.dto.RemoveTokenRequest;
import interfaces.http.game.moveCurrentCard.MoveCurrentCardHandler;
import interfaces.http.game.moveCurrentCard.dto.MoveCurrentCardRequest;
import interfaces.http.game.returnCurrentCard.ReturnCurrentCardHandler;
import interfaces.http.game.returnCurrentCard.dto.ReturnCurrentCardRequest;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
@Path("/api/game/")
public class GameResource {
    private final NextTurnHandler nextTurnHandler;
    private final AddCurrentCardHandler addCurrentCardHandler;
    private final RemoveCurrentCardHandler removeCurrentCardHandler;
    private final ReturnCurrentCardHandler returnCurrentCardHandler;
    private final MoveCurrentCardHandler moveCurrentCardHandler;
    private final AddTokenHandler addTokenHandler;
    private final RemoveTokenHandler removeTokenHandler;
    public GameResource(
            NextTurnHandler nextTurnHandler,
            AddCurrentCardHandler addCurrentCardHandler,
            RemoveCurrentCardHandler removeCurrentCardHandler,
            ReturnCurrentCardHandler returnCurrentCardHandler,
            MoveCurrentCardHandler moveCurrentCardHandler,
            AddTokenHandler addTokenHandler,
            RemoveTokenHandler removeTokenHandler) {
        this.nextTurnHandler = nextTurnHandler;
        this.addCurrentCardHandler = addCurrentCardHandler;
        this.removeCurrentCardHandler = removeCurrentCardHandler;
        this.returnCurrentCardHandler = returnCurrentCardHandler;
        this.moveCurrentCardHandler = moveCurrentCardHandler;
        this.addTokenHandler = addTokenHandler;
        this.removeTokenHandler = removeTokenHandler;
    }
    @POST
    @Path("next-turn")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public EventResponse nextTurn(NextTurnRequest request) {
        System.out.println("Next turn for gameId: " + request.gameId() + " by playerId: " + request.playerId());
        return nextTurnHandler.handleEvent(request);
    }
    @POST
    @Path("add-current-card")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public EventResponse addCurrentCard(AddCurrentCardRequest request) {
        System.out.println("Add current card for gameId: " + request.gameId() + " by playerId: " + request.playerId());
        return addCurrentCardHandler.handleEvent(request);
    }
    @POST
    @Path("remove-current-card")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public EventResponse removeCurrentCard(RemoveCurrentCardRequest request) {
        System.out.println("Remove current card for gameId: " + request.gameId() + " by playerId: " + request.playerId());
        return removeCurrentCardHandler.handleEvent(request);
    }
    @POST
    @Path("return-current-card")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public EventResponse returnCurrentCard(ReturnCurrentCardRequest request) {
        System.out.println("Return current card for gameId: " + request.gameId() + " by playerId: " + request.playerId());
        return returnCurrentCardHandler.handleEvent(request);
    }
    @POST
    @Path("move-current-card")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public EventResponse moveCurrentCard(MoveCurrentCardRequest request) {
        System.out.println("Move current card for gameId: " + request.gameId() + " by playerId: " + request.playerId());
        return moveCurrentCardHandler.handleEvent(request);
    }
    @POST
    @Path("add-token")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public EventResponse addToken(AddTokenRequest request) {
        System.out.println("Add token for gameId: " + request.gameId() + " by playerId: " + request.playerId());
        return addTokenHandler.handleEvent(request);
    }
    @POST
    @Path("remove-token")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public EventResponse removeToken(RemoveTokenRequest request) {
        System.out.println("Remove token for gameId: " + request.gameId() + " by playerId: " + request.playerId());
        return removeTokenHandler.handleEvent(request);
    }
}

