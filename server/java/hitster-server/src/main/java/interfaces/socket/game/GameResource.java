package interfaces.socket.game;

import com.corundumstudio.socketio.SocketIOServer;
import interfaces.socket.SocketResource;
import interfaces.socket.game.addCurrentCard.AddCurrentCardHandler;
import interfaces.socket.game.addCurrentCard.dto.AddCurrentCardRequest;
import interfaces.socket.game.addToken.AddTokenHandler;
import interfaces.socket.game.addToken.dto.AddTokenRequest;
import interfaces.socket.game.nextTurn.NextTurnHandler;
import interfaces.socket.game.nextTurn.dto.NextTurnRequest;
import interfaces.socket.game.removeCurrentCard.RemoveCurrentCardHandler;
import interfaces.socket.game.removeCurrentCard.dto.RemoveCurrentCardRequest;
import interfaces.socket.game.removeToken.RemoveTokenHandler;
import interfaces.socket.game.removeToken.dto.RemoveTokenRequest;
import interfaces.socket.game.moveCurrentCard.MoveCurrentCardHandler;
import interfaces.socket.game.moveCurrentCard.dto.MoveCurrentCardRequest;
import interfaces.socket.game.returnCurrentCard.ReturnCurrentCardHandler;
import interfaces.socket.game.returnCurrentCard.dto.ReturnCurrentCardRequest;

public class GameResource implements SocketResource {
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

    @Override
    public void setupEventListeners(SocketIOServer server) {
        server.addEventListener("next-turn", NextTurnRequest.class, (client, request, ackSender) -> {
            nextTurnHandler.handleEvent(server, client, request, ackSender);
        });

        server.addEventListener("add-current-card", AddCurrentCardRequest.class, (client, request, ackSender) -> {
            addCurrentCardHandler.handleEvent(server, client, request, ackSender);
        });

        server.addEventListener("remove-current-card", RemoveCurrentCardRequest.class, (client, request, ackSender) -> {
            removeCurrentCardHandler.handleEvent(server, client, request, ackSender);
        });

        server.addEventListener("return-current-card", ReturnCurrentCardRequest.class, (client, request, ackSender) -> {
            returnCurrentCardHandler.handleEvent(server, client, request, ackSender);
        });

        server.addEventListener("move-current-card", MoveCurrentCardRequest.class, (client, request, ackSender) -> {
            moveCurrentCardHandler.handleEvent(server, client, request, ackSender);
        });

        server.addEventListener("add-token", AddTokenRequest.class, (client, request, ackSender) -> {
            addTokenHandler.handleEvent(server, client, request, ackSender);
        });

        server.addEventListener("remove-token", RemoveTokenRequest.class, (client, request, ackSender) -> {
            removeTokenHandler.handleEvent(server, client, request, ackSender);
        });
    }
}
