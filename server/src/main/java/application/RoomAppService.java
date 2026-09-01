package application;

import domain.connection.*;
import domain.exception.ConnectionNotFoundException;
import domain.exception.GameNotFoundException;
import domain.game.*;
import domain.deck.item.card.Card;
import domain.player.Player;
import domain.player.PlayerColor;
import domain.player.PlayerFactory;
import domain.player.PlayerId;
import domain.room.*;
import domain.music.*;
import infrastructure.persistence.inMemory.music.MusicRepositoryFactory;

import java.util.List;
import java.util.function.Consumer;

public class RoomAppService {
    private final RoomRepository roomRepository;
    private final GameRepository gameRepository;
    private final ConnectionRepository connectionRepository;
    private final ConnectionServer connectionServer;
    private final RoomFactory roomFactory;
    private final GameFactory gameFactory;
    private final ConnectionFactory connectionFactory;
    private final PlayerFactory playerFactory;
    private final MusicRepositoryFactory musicRepositoryFactory;
    private final RoomValidator roomValidator;

    public RoomAppService(RoomRepository roomRepository, GameRepository gameRepository, ConnectionRepository connectionRepository, ConnectionServer connectionServer, RoomFactory roomFactory, GameFactory gameFactory, ConnectionFactory connectionFactory, PlayerFactory playerFactory, MusicRepositoryFactory musicRepositoryFactory, RoomValidator roomValidator) {
        this.roomRepository = roomRepository;
        this.gameRepository = gameRepository;
        this.connectionRepository = connectionRepository;
        this.connectionServer = connectionServer;
        this.roomFactory = roomFactory;
        this.gameFactory = gameFactory;
        this.connectionFactory = connectionFactory;
        this.playerFactory = playerFactory;
        this.musicRepositoryFactory = musicRepositoryFactory;
        this.roomValidator = roomValidator;
    }

    public GameId createGame() {
        Room room = roomFactory.create(gameFactory, playerFactory, roomValidator);
        roomRepository.saveRoom(room);
        return room.getId();
    }

    public List<Player> connectGame(GameId gameId) {
        Room room = roomRepository.getRoomById(gameId)
                .orElseThrow(() -> new GameNotFoundException(gameId));

        return room.getPlayers();
    }

    public void joinGame(ConnectionId connectionId, GameId gameId, PlayerId playerId, String playerName) {
        Connection connection = connectionFactory.create(connectionId, playerId, gameId);
        List<Connection> connections = connectionRepository.getConnectionsByPlayerIdAndGameId(connection.getPlayerId(), connection.getGameId());
        Room room = roomRepository.getRoomById(gameId)
                .orElseThrow(() -> new GameNotFoundException(gameId));

        if (connections.isEmpty()) {
            room.addPlayer(playerId, playerName);
        }
        connectionServer.joinRoom(connection);
        connectionRepository.addConnection(connection);
        roomRepository.saveRoom(room);
        connectionServer.broadcastRoomState(room);

        if (room.getGameStatus() == GameStatus.PLAYING) {
            Game game = gameRepository.getGameById(gameId)
                    .orElseThrow(() -> new GameNotFoundException(gameId));

            if (connections.isEmpty()) {
                game.addPlayer(playerId);
            }
            gameRepository.saveGame(game);
            connectionServer.broadcastGameState(game);
        }
    }

    public void leaveGame(ConnectionId connectionId) {
        Connection connection = connectionRepository.getConnectionById(connectionId)
                .orElseThrow(() -> new ConnectionNotFoundException(connectionId));
        List<Connection> connections = connectionRepository.getConnectionsByPlayerIdAndGameId(connection.getPlayerId(), connection.getGameId());
        Room room = roomRepository.getRoomById(connection.getGameId())
                .orElseThrow(() -> new GameNotFoundException(connection.getGameId()));

        if (connections.size() == 1) {
            room.removePlayer(connection.getPlayerId());
        }
        connectionRepository.removeConnection(connection);
        roomRepository.saveRoom(room);
        connectionServer.broadcastRoomState(room);

        if (room.getGameStatus() == GameStatus.PLAYING) {
            Game game = gameRepository.getGameById(connection.getGameId())
                    .orElseThrow(() -> new GameNotFoundException(connection.getGameId()));
            game.removePlayer(connection.getPlayerId());
            gameRepository.saveGame(game);
            connectionServer.broadcastGameState(game);
        }

        if (room.isEmpty()) {
            roomRepository.deleteRoom(room.getId());
            gameRepository.deleteGame(room.getId());
        }
    }

    public void kickPlayer(GameId gameId, PlayerId playerId, PlayerId playerToRemoveId) {
        List<Connection> connections = connectionRepository.getConnectionsByPlayerIdAndGameId(playerToRemoveId, gameId);
        Room room = roomRepository.getRoomById(gameId)
                .orElseThrow(() -> new GameNotFoundException(gameId));

        room.kickPlayer(playerId, playerToRemoveId);
        connections.forEach(connectionServer::leaveRoom);
        connections.forEach(connectionRepository::removeConnection);

        Game game = null;
        if (room.getGameStatus() == GameStatus.PLAYING) {
            game = gameRepository.getGameById(gameId)
                    .orElseThrow(() -> new GameNotFoundException(gameId));
            game.removePlayer(playerToRemoveId);
        }

        if (room.isEmpty()) {
            roomRepository.deleteRoom(gameId);
            gameRepository.deleteGame(gameId);
            return;
        }

        roomRepository.saveRoom(room);
        connectionServer.broadcastRoomState(room);

        if (game != null) {
            gameRepository.saveGame(game);
            connectionServer.broadcastGameState(game);
        }
    }

    public void startGame(GameId gameId, PlayerId playerId) {
        Room room = roomRepository.getRoomById(gameId)
                .orElseThrow(() -> new GameNotFoundException(gameId));
        Game game = room.startGame(playerId);

        MusicRepository musicRepository = musicRepositoryFactory.getMusicRepository(room);
        List<Card> stack = musicRepository.getCardsByPlaylistId(room.getId(), room.getPlaylists().stream().map(Playlist::id).toList());
        game.startGame(stack);

        roomRepository.saveRoom(room);
        gameRepository.saveGame(game);
        connectionServer.broadcastGameState(game);
    }

    public void changePlayerMe(GameId gameId, PlayerId playerId, String newName, PlayerColor newColor) {
        Room r = execute(gameId, room -> {
            if (newName != null && !newName.isBlank()) {
                room.changePlayerName(playerId, newName);
            }
            if (newColor != null) {
                room.changePlayerColor(playerId, newColor);
            }
        });
        connectionServer.broadcastRoomState(r);
    }

    public void addPlaylist(GameId gameId, PlayerId playerId, Playlist playlist) {
        Room r = execute(gameId, room -> room.addPlaylist(playerId, playlist));
        connectionServer.broadcastRoomState(r);
    }

    public void removePlaylist(GameId gameId, PlayerId playerId, PlaylistId playlistId) {
        Room r = execute(gameId, room -> room.removePlaylist(playerId, playlistId));
        connectionServer.broadcastRoomState(r);
    }

    private Room execute(GameId gameId, Consumer<Room> action) {
        Room room = roomRepository.getRoomById(gameId)
                .orElseThrow(() -> new GameNotFoundException(gameId));

        action.accept(room);
        roomRepository.saveRoom(room);

        return room;
    }
}
