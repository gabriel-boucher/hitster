package application;

import domain.connection.*;
import domain.exception.ConnectionNotFoundException;
import domain.exception.GameNotFoundException;
import domain.game.Game;
import domain.game.GameFactory;
import domain.game.GameId;
import domain.game.GameRepository;
import domain.game.item.card.Card;
import domain.player.PlayerColor;
import domain.player.PlayerFactory;
import domain.player.PlayerId;
import domain.room.*;
import domain.music.*;
import infrastructure.music.MusicRepositoryFactory;

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

    public Room createGame() {
        Room room = roomFactory.create(gameFactory, playerFactory, roomValidator);
        roomRepository.saveRoom(room);
        return room;
    }

    public PlayerId joinGame(ConnectionId connectionId, GameId gameId, PlayerId playerId) {
        Connection connection = connectionFactory.create(connectionId, playerId, gameId);
        Room room = roomRepository.getRoomById(gameId)
                .orElseThrow(() -> new GameNotFoundException(gameId));

        room.joinRoom(playerId);
        connectionServer.joinRoom(connection);

        roomRepository.saveRoom(room);
        connectionRepository.addConnection(connection);
        connectionServer.broadcastRoomState(room);

        return connection.getPlayerId();
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

        roomRepository.saveRoom(room);
        connectionRepository.removeConnection(connection);
        connectionServer.broadcastRoomState(room);
    }

    public void startGame(GameId gameId, PlayerId playerId) {
        Room room = roomRepository.getRoomById(gameId)
                .orElseThrow(() -> new GameNotFoundException(gameId));

        Game game = room.startGame(playerId);
        roomRepository.saveRoom(room);

        MusicRepository musicRepository = musicRepositoryFactory.getMusicRepository(room);
        List<Card> pile = musicRepository.getCardsByPlaylistId(room.getId(), room.getPlaylists().stream().map(Playlist::id).toList());
        game.startGame(pile);
        gameRepository.saveGame(game);
        connectionServer.broadcastGameState(game);
    }

    public void kickPlayer(GameId gameId, PlayerId playerId, PlayerId playerToRemoveId) {
        List<Connection> connections = connectionRepository.getConnectionsByPlayerIdAndGameId(playerToRemoveId, gameId);
        Room room = roomRepository.getRoomById(gameId)
                .orElseThrow(() -> new GameNotFoundException(gameId));

        room.kickPlayer(playerId, playerToRemoveId);
        connections.forEach(connectionServer::leaveRoom);

        roomRepository.saveRoom(room);
        connections.forEach(connectionRepository::removeConnection);
        connectionServer.broadcastRoomState(room);
    }

    public void changePlayerName(GameId gameId, PlayerId playerId, String newName) {
        Room r = execute(gameId, room -> room.changePlayerName(playerId, newName));
        connectionServer.broadcastRoomState(r);
    }

    public void changePlayerColor(GameId gameId, PlayerId playerId, PlayerColor newColor) {
        Room r = execute(gameId, room -> room.changePlayerColor(playerId, newColor));
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
