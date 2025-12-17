package interfaces.socket.game;

import application.GameAppService;
import com.corundumstudio.socketio.SocketIOServer;
import domain.game.Game;
import interfaces.socket.game.dto.GameStateResponse;
import interfaces.socket.game.dto.addCurrentCard.AddCurrentCardData;
import interfaces.socket.game.dto.addCurrentCard.AddCurrentCardRequest;
import interfaces.socket.game.dto.addToken.AddTokenData;
import interfaces.socket.game.dto.addToken.AddTokenRequest;
import interfaces.socket.game.dto.nextTurn.NextTurnData;
import interfaces.socket.game.dto.nextTurn.NextTurnRequest;
import interfaces.socket.game.dto.removeCurrentCard.RemoveCurrentCardData;
import interfaces.socket.game.dto.removeCurrentCard.RemoveCurrentCardRequest;
import interfaces.socket.game.dto.removeToken.RemoveTokenData;
import interfaces.socket.game.dto.removeToken.RemoveTokenRequest;
import interfaces.socket.game.dto.reorderCurrentCard.ReorderCurrentCardData;
import interfaces.socket.game.dto.reorderCurrentCard.ReorderCurrentCardRequest;
import interfaces.socket.game.dto.startGame.StartGameData;
import interfaces.socket.game.dto.startGame.StartGameRequest;
import interfaces.socket.game.mapper.*;
import interfaces.mapper.GameStateMapper;

public class GameRessource {
    private final GameAppService gameAppService;
    private final StartGameMapper startGameMapper;
    private final NextTurnMapper nextTurnMapper;
    private final AddCurrentCardMapper addCurrentCardMapper;
    private final RemoveCurrentCardMapper removeCurrentCardMapper;
    private final ReorderCurrentCardMapper reorderCurrentCardMapper;
    private final AddTokenMapper addTokenMapper;
    private final RemoveTokenMapper removeTokenMapper;
    private final GameStateMapper gameStateMapper;

    public GameRessource(
            GameAppService gameAppService,
            StartGameMapper startGameMapper,
            NextTurnMapper nextTurnMapper,
            AddCurrentCardMapper addCurrentCardMapper,
            RemoveCurrentCardMapper removeCurrentCardMapper,
            ReorderCurrentCardMapper reorderCurrentCardMapper,
            AddTokenMapper addTokenMapper,
            RemoveTokenMapper removeTokenMapper,
            GameStateMapper gameStateMapper) {
        this.gameAppService = gameAppService;
        this.startGameMapper = startGameMapper;
        this.nextTurnMapper = nextTurnMapper;
        this.addCurrentCardMapper = addCurrentCardMapper;
        this.removeCurrentCardMapper = removeCurrentCardMapper;
        this.reorderCurrentCardMapper = reorderCurrentCardMapper;
        this.addTokenMapper = addTokenMapper;
        this.removeTokenMapper = removeTokenMapper;
        this.gameStateMapper = gameStateMapper;
    }

    public void setupEventListeners(SocketIOServer socketIOServer) {
        socketIOServer.addEventListener("start-game", StartGameRequest.class, (client, request, ackSender) -> {
            StartGameData data = startGameMapper.toDomain(request);
            Game game = gameAppService.startGame(data.roomId(), data.playerId());
            client.joinRoom(game.getId().toString());

            broadcastGameState(game, socketIOServer);
        });

        socketIOServer.addEventListener("next-turn", NextTurnRequest.class, (client, request, ackSender) -> {
            NextTurnData data = nextTurnMapper.toDomain(request);
            Game game = gameAppService.nextTurn(data.gameId(), data.playerId());

            broadcastGameState(game, socketIOServer);
        });

        socketIOServer.addEventListener("add-current-card", AddCurrentCardRequest.class, (client, request, ackSender) -> {
            AddCurrentCardData data = addCurrentCardMapper.toDomain(request);
            Game game = gameAppService.addCurrentCard(data.gameId(), data.playerId(), data.position());

            broadcastGameState(game, socketIOServer);
        });

        socketIOServer.addEventListener("remove-current-card", RemoveCurrentCardRequest.class, (client, request, ackSender) -> {
            RemoveCurrentCardData data = removeCurrentCardMapper.toDomain(request);
            Game game = gameAppService.removeCurrentCard(data.gameId(), data.playerId());

            broadcastGameState(game, socketIOServer);
        });

        socketIOServer.addEventListener("reorder-current-card", ReorderCurrentCardRequest.class, (client, request, ackSender) -> {
            ReorderCurrentCardData data = reorderCurrentCardMapper.toDomain(request);
            Game game = gameAppService.reorderCurrentCard(data.gameId(), data.playerId(), data.newPosition());

            broadcastGameState(game, socketIOServer);
        });

        socketIOServer.addEventListener("add-token", AddTokenRequest.class, (client, request, ackSender) -> {
            AddTokenData data = addTokenMapper.toDomain(request);
            Game game = gameAppService.addToken(data.gameId(), data.playerId(), data.tokenId(), data.position());

            broadcastGameState(game, socketIOServer);
        });

        socketIOServer.addEventListener("remove-token", RemoveTokenRequest.class, (client, request, ackSender) -> {
            RemoveTokenData data = removeTokenMapper.toDomain(request);
            Game game = gameAppService.removeToken(data.gameId(), data.playerId(), data.tokenId());

            broadcastGameState(game, socketIOServer);
        });
    }

    private void broadcastGameState(Game game, SocketIOServer socketIOServer) {
        GameStateResponse response = gameStateMapper.toDto(game);
        socketIOServer.getRoomOperations(game.getId().toString()).sendEvent("game-state", response);
    }
}
