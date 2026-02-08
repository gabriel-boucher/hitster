package application;

import domain.exception.RoomNotFoundException;
import domain.game.Game;
import domain.game.GameFactory;
import domain.game.GameRepository;
import domain.game.item.card.Card;
import domain.player.PlayerColor;
import domain.player.PlayerFactory;
import domain.player.PlayerId;
import domain.room.Room;
import domain.room.RoomFactory;
import domain.room.RoomId;
import domain.room.RoomRepository;
import domain.spotify.accessToken.AccessCode;
import domain.spotify.accessToken.AccessToken;
import domain.spotify.accessToken.AccessTokenRepository;
import domain.spotify.playlist.Playlist;
import domain.spotify.playlist.PlaylistId;
import domain.spotify.playlist.PlaylistRepository;

import java.util.List;
import java.util.function.Consumer;

public class RoomAppService {
    private final RoomRepository roomRepository;
    private final GameRepository gameRepository;
    private final AccessTokenRepository accessTokenRepository;
    private final PlaylistRepository playlistRepository;
    private final RoomFactory roomFactory;
    private final GameFactory gameFactory;
    private final PlayerFactory playerFactory;

    public RoomAppService(RoomRepository roomRepository, GameRepository gameRepository, AccessTokenRepository accessTokenRepository, PlaylistRepository playlistRepository, RoomFactory roomFactory, GameFactory gameFactory, PlayerFactory playerFactory) {
        this.roomRepository = roomRepository;
        this.gameRepository = gameRepository;
        this.accessTokenRepository = accessTokenRepository;
        this.playlistRepository = playlistRepository;
        this.roomFactory = roomFactory;
        this.gameFactory = gameFactory;
        this.playerFactory = playerFactory;
    }

    public Room createRoom(AccessCode accessCode) {
        AccessToken accessToken = accessTokenRepository.getAccessTokenByAccessCode(accessCode);
        Room room = roomFactory.create(accessToken, gameFactory, playerFactory);
        roomRepository.saveRoom(room);
        return room;
    }

    public Room joinRoom(RoomId roomId, PlayerId playerId) {
        return execute(roomId, room -> room.joinRoom(playerId));
    }

    public Room changePlayerName(RoomId roomId, PlayerId playerId, String newName) {
        return execute(roomId, room -> room.changePlayerName(playerId, newName));
    }

    public Room changePlayerColor(RoomId roomId, PlayerId playerId, PlayerColor newColor) {
        return execute(roomId, room -> room.changePlayerColor(playerId, newColor));
    }

    public Room removePlayer(RoomId roomId, PlayerId playerId, PlayerId playerToRemoveId) {
        return execute(roomId, room -> room.removePlayer(playerId, playerToRemoveId));
    }

    public Room addPlaylist(RoomId roomId, PlayerId playerId, Playlist playlist) {
        return execute(roomId, room -> room.addPlaylist(playerId, playlist));
    }

    public Room removePlaylist(RoomId roomId, PlayerId playerId, PlaylistId playlistId) {
        return execute(roomId, room -> room.removePlaylist(playerId, playlistId));
    }

    public Game startGame(RoomId roomId, PlayerId playerId) {
        Room room = roomRepository.getRoomById(roomId);
        if (room == null) {
            throw new RoomNotFoundException(roomId);
        }

        Game game = room.startGame(playerId);
        roomRepository.saveRoom(room);

        List<Card> pile = playlistRepository.getCardsByPlaylistId(room.getAccessToken(), room.getPlaylists().stream().map(Playlist::id).toList());
        game.startGame(pile);
        gameRepository.saveGame(game);
        return game;
    }

    private Room execute(RoomId roomId, Consumer<Room> action) {
        Room room = roomRepository.getRoomById(roomId);
        if (room == null) {
            throw new RoomNotFoundException(roomId);
        }
        action.accept(room);
        roomRepository.saveRoom(room);
        return room;
    }
}
