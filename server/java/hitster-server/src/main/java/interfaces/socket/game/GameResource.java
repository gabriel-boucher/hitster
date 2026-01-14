package interfaces.socket.game;

import application.GameAppService;
import com.corundumstudio.socketio.SocketIOServer;
import domain.game.Game;
import interfaces.socket.SocketResource;
import interfaces.socket.game.addCurrentCard.dto.AddCurrentCardData;
import interfaces.socket.game.addCurrentCard.AddCurrentCardMapper;
import interfaces.socket.game.addCurrentCard.dto.AddCurrentCardRequest;
import interfaces.socket.game.addToken.dto.AddTokenData;
import interfaces.socket.game.addToken.AddTokenMapper;
import interfaces.socket.game.addToken.dto.AddTokenRequest;
import interfaces.socket.game.nextTurn.dto.NextTurnData;
import interfaces.socket.game.nextTurn.NextTurnMapper;
import interfaces.socket.game.nextTurn.dto.NextTurnRequest;
import interfaces.socket.game.removeCurrentCard.dto.RemoveCurrentCardData;
import interfaces.socket.game.removeCurrentCard.RemoveCurrentCardMapper;
import interfaces.socket.game.removeCurrentCard.dto.RemoveCurrentCardRequest;
import interfaces.socket.game.removeToken.dto.RemoveTokenData;
import interfaces.socket.game.removeToken.RemoveTokenMapper;
import interfaces.socket.game.removeToken.dto.RemoveTokenRequest;
import interfaces.socket.game.reorderCurrentCard.dto.ReorderCurrentCardData;
import interfaces.socket.game.reorderCurrentCard.ReorderCurrentCardMapper;
import interfaces.socket.game.reorderCurrentCard.dto.ReorderCurrentCardRequest;
import interfaces.mapper.GameStateMapper;

public class GameResource implements SocketResource {
    private final GameAppService gameAppService;
    private final NextTurnMapper nextTurnMapper;
    private final AddCurrentCardMapper addCurrentCardMapper;
    private final RemoveCurrentCardMapper removeCurrentCardMapper;
    private final ReorderCurrentCardMapper reorderCurrentCardMapper;
    private final AddTokenMapper addTokenMapper;
    private final RemoveTokenMapper removeTokenMapper;
    private final GameStateMapper gameStateMapper;

    public GameResource(
            GameAppService gameAppService,
            NextTurnMapper nextTurnMapper,
            AddCurrentCardMapper addCurrentCardMapper,
            RemoveCurrentCardMapper removeCurrentCardMapper,
            ReorderCurrentCardMapper reorderCurrentCardMapper,
            AddTokenMapper addTokenMapper,
            RemoveTokenMapper removeTokenMapper,
            GameStateMapper gameStateMapper) {
        this.gameAppService = gameAppService;
        this.nextTurnMapper = nextTurnMapper;
        this.addCurrentCardMapper = addCurrentCardMapper;
        this.removeCurrentCardMapper = removeCurrentCardMapper;
        this.reorderCurrentCardMapper = reorderCurrentCardMapper;
        this.addTokenMapper = addTokenMapper;
        this.removeTokenMapper = removeTokenMapper;
        this.gameStateMapper = gameStateMapper;
    }

    @Override
    public void setupEventListeners(SocketIOServer server) {
        server.addEventListener("next-turn", NextTurnRequest.class, (client, request, ackSender) -> {
            NextTurnData data = nextTurnMapper.toDomain(request);
            Game game = gameAppService.nextTurn(data.gameId(), data.playerId());

            broadcastGameState(game, server);
        });

        server.addEventListener("add-current-card", AddCurrentCardRequest.class, (client, request, ackSender) -> {
            AddCurrentCardData data = addCurrentCardMapper.toDomain(request);
            Game game = gameAppService.addCurrentCard(data.gameId(), data.playerId(), data.position());

            broadcastGameState(game, server);
        });

        server.addEventListener("remove-current-card", RemoveCurrentCardRequest.class, (client, request, ackSender) -> {
            RemoveCurrentCardData data = removeCurrentCardMapper.toDomain(request);
            Game game = gameAppService.removeCurrentCard(data.gameId(), data.playerId());

            broadcastGameState(game, server);
        });

        server.addEventListener("reorder-current-card", ReorderCurrentCardRequest.class, (client, request, ackSender) -> {
            ReorderCurrentCardData data = reorderCurrentCardMapper.toDomain(request);
            Game game = gameAppService.reorderCurrentCard(data.gameId(), data.playerId(), data.newPosition());

            broadcastGameState(game, server);
        });

        server.addEventListener("add-id", AddTokenRequest.class, (client, request, ackSender) -> {
            AddTokenData data = addTokenMapper.toDomain(request);
            Game game = gameAppService.addToken(data.gameId(), data.playerId(), data.tokenId(), data.position());

            broadcastGameState(game, server);
        });

        server.addEventListener("remove-id", RemoveTokenRequest.class, (client, request, ackSender) -> {
            RemoveTokenData data = removeTokenMapper.toDomain(request);
            Game game = gameAppService.removeToken(data.gameId(), data.playerId(), data.tokenId());

            broadcastGameState(game, server);
        });
    }

    private void broadcastGameState(Game game, SocketIOServer socketIOServer) {
        GameStateResponse response = gameStateMapper.toDto(game);
        socketIOServer.getRoomOperations(game.getId().toString()).sendEvent("game-state", response);
    }
}
