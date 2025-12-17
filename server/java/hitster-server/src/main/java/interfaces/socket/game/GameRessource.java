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
    private SocketIOServer socketIOServer;

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

    public void initialize(SocketIOServer server) {
        this.socketIOServer = server;
        setupEventListeners();
    }

    private void setupEventListeners() {
        // Start game event
        socketIOServer.addEventListener("start-game", StartGameRequest.class, (client, request, ackSender) -> {
            try {
                System.out.println("Starting game: " + request.roomId() + " by playerId: " + request.playerId());

                StartGameData data = startGameMapper.toDomain(request);
                Game game = gameAppService.startGame(data.roomId(), data.playerId());
                GameStateResponse response = gameStateMapper.toDto(game);

                // Join the Socket.IO room for this game
                String gameId = game.getId().toString();
                client.joinRoom(gameId);
                
                client.sendEvent("game-state", response);
                // Broadcast to all clients in the game room
                socketIOServer.getRoomOperations(gameId).sendEvent("game-state", response);
                
                if (ackSender.isAckRequested()) {
                    ackSender.sendAckData(response);
                }
            } catch (Exception e) {
                System.err.println("Error starting game: " + e.getMessage());
                e.printStackTrace();
                client.sendEvent("error", "{\"message\": \"" + e.getMessage() + "\"}");
                if (ackSender.isAckRequested()) {
                    ackSender.sendAckData("{\"error\": \"" + e.getMessage() + "\"}");
                }
            }
        });

        // Next turn event
        socketIOServer.addEventListener("next-turn", NextTurnRequest.class, (client, request, ackSender) -> {
            try {
                System.out.println("Advancing to next turn in game: " + request.gameId() + " by playerId: " + request.playerId());

                NextTurnData data = nextTurnMapper.toDomain(request);
                Game game = gameAppService.nextTurn(data.gameId(), data.playerId());
                GameStateResponse response = gameStateMapper.toDto(game);

                // Broadcast to all clients in the game room
                socketIOServer.getRoomOperations(request.gameId()).sendEvent("game-state", response);
                
                if (ackSender.isAckRequested()) {
                    ackSender.sendAckData(response);
                }
            } catch (Exception e) {
                System.err.println("Error advancing turn: " + e.getMessage());
                e.printStackTrace();
                client.sendEvent("error", "{\"message\": \"" + e.getMessage() + "\"}");
                if (ackSender.isAckRequested()) {
                    ackSender.sendAckData("{\"error\": \"" + e.getMessage() + "\"}");
                }
            }
        });

        // Add current card event
        socketIOServer.addEventListener("add-current-card", AddCurrentCardRequest.class, (client, request, ackSender) -> {
            try {
                System.out.println("Adding current card to current deck in game: " + request.gameId() + " by playerId: " + request.playerId() + " at position: " + request.position());

                AddCurrentCardData data = addCurrentCardMapper.toDomain(request);
                Game game = gameAppService.addCurrentCard(data.gameId(), data.playerId(), data.position());
                GameStateResponse response = gameStateMapper.toDto(game);

                // Broadcast to all clients in the game room
                socketIOServer.getRoomOperations(request.gameId()).sendEvent("game-state", response);
                
                if (ackSender.isAckRequested()) {
                    ackSender.sendAckData(response);
                }
            } catch (Exception e) {
                System.err.println("Error adding current card: " + e.getMessage());
                e.printStackTrace();
                client.sendEvent("error", "{\"message\": \"" + e.getMessage() + "\"}");
                if (ackSender.isAckRequested()) {
                    ackSender.sendAckData("{\"error\": \"" + e.getMessage() + "\"}");
                }
            }
        });

        // Remove current card event
        socketIOServer.addEventListener("remove-current-card", RemoveCurrentCardRequest.class, (client, request, ackSender) -> {
            try {
                System.out.println("Removing current card from current deck in game: " + request.gameId() + " by playerId: " + request.playerId());

                RemoveCurrentCardData data = removeCurrentCardMapper.toDomain(request);
                Game game = gameAppService.removeCurrentCard(data.gameId(), data.playerId());
                GameStateResponse response = gameStateMapper.toDto(game);

                // Broadcast to all clients in the game room
                socketIOServer.getRoomOperations(request.gameId()).sendEvent("game-state", response);
                
                if (ackSender.isAckRequested()) {
                    ackSender.sendAckData(response);
                }
            } catch (Exception e) {
                System.err.println("Error removing current card: " + e.getMessage());
                e.printStackTrace();
                client.sendEvent("error", "{\"message\": \"" + e.getMessage() + "\"}");
                if (ackSender.isAckRequested()) {
                    ackSender.sendAckData("{\"error\": \"" + e.getMessage() + "\"}");
                }
            }
        });

        // Reorder current card event
        socketIOServer.addEventListener("reorder-current-card", ReorderCurrentCardRequest.class, (client, request, ackSender) -> {
            try {
                System.out.println("Reordering current card in current deck in game: " + request.gameId() + " by playerId: " + request.playerId() + " to new position: " + request.newPosition());

                ReorderCurrentCardData data = reorderCurrentCardMapper.toDomain(request);
                Game game = gameAppService.reorderCurrentCard(data.gameId(), data.playerId(), data.newPosition());
                GameStateResponse response = gameStateMapper.toDto(game);

                // Broadcast to all clients in the game room
                socketIOServer.getRoomOperations(request.gameId()).sendEvent("game-state", response);
                
                if (ackSender.isAckRequested()) {
                    ackSender.sendAckData(response);
                }
            } catch (Exception e) {
                System.err.println("Error reordering current card: " + e.getMessage());
                e.printStackTrace();
                client.sendEvent("error", "{\"message\": \"" + e.getMessage() + "\"}");
                if (ackSender.isAckRequested()) {
                    ackSender.sendAckData("{\"error\": \"" + e.getMessage() + "\"}");
                }
            }
        });

        // Add token event
        socketIOServer.addEventListener("add-token", AddTokenRequest.class, (client, request, ackSender) -> {
            try {
                System.out.println("Adding token to current deck in game: " + request.gameId() + " by playerId: " + request.playerId() + " tokenId: " + request.tokenId() + " at position: " + request.position());

                AddTokenData data = addTokenMapper.toDomain(request);
                Game game = gameAppService.addToken(data.gameId(), data.playerId(), data.tokenId(), data.position());
                GameStateResponse response = gameStateMapper.toDto(game);

                // Broadcast to all clients in the game room
                socketIOServer.getRoomOperations(request.gameId()).sendEvent("game-state", response);
                
                if (ackSender.isAckRequested()) {
                    ackSender.sendAckData(response);
                }
            } catch (Exception e) {
                System.err.println("Error adding token: " + e.getMessage());
                e.printStackTrace();
                client.sendEvent("error", "{\"message\": \"" + e.getMessage() + "\"}");
                if (ackSender.isAckRequested()) {
                    ackSender.sendAckData("{\"error\": \"" + e.getMessage() + "\"}");
                }
            }
        });

        // Remove token event
        socketIOServer.addEventListener("remove-token", RemoveTokenRequest.class, (client, request, ackSender) -> {
            try {
                System.out.println("Removing token from current deck in game: " + request.gameId() + " by playerId: " + request.playerId() + " tokenId: " + request.tokenId());

                RemoveTokenData data = removeTokenMapper.toDomain(request);
                Game game = gameAppService.removeToken(data.gameId(), data.playerId(), data.tokenId());
                GameStateResponse response = gameStateMapper.toDto(game);

                // Broadcast to all clients in the game room
                socketIOServer.getRoomOperations(request.gameId()).sendEvent("game-state", response);
                
                if (ackSender.isAckRequested()) {
                    ackSender.sendAckData(response);
                }
            } catch (Exception e) {
                System.err.println("Error removing token: " + e.getMessage());
                e.printStackTrace();
                client.sendEvent("error", "{\"message\": \"" + e.getMessage() + "\"}");
                if (ackSender.isAckRequested()) {
                    ackSender.sendAckData("{\"error\": \"" + e.getMessage() + "\"}");
                }
            }
        });
    }
}
