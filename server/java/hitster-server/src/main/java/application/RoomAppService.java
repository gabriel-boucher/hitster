package application;

import domain.exception.RoomNotFoundException;
import domain.game.CardRepository;
import domain.game.GameRepository;
import domain.player.PlayerFactory;
import domain.player.PlayerId;
import domain.room.Room;
import domain.room.RoomFactory;
import domain.room.RoomId;
import domain.room.RoomRepository;
import domain.spotify.Playlist;
import domain.spotify.PlaylistId;

public class RoomAppService {
    private final RoomRepository roomRepository;
    private final GameRepository gameRepository;
    private final CardRepository cardRepository;
    private final RoomFactory roomFactory;
    private final PlayerFactory playerFactory;

    public RoomAppService(RoomRepository roomRepository, GameRepository gameRepository, CardRepository cardRepository, RoomFactory roomFactory, PlayerFactory playerFactory) {
        this.roomRepository = roomRepository;
        this.gameRepository = gameRepository;
        this.cardRepository = cardRepository;
        this.roomFactory = roomFactory;
        this.playerFactory = playerFactory;
    }

    public Room createRoom(PlayerId playerId) {
        Room room = roomFactory.create(playerId, playerFactory);
        roomRepository.saveRoom(room);
        return room;
    }

    public Room joinRoom(RoomId roomId, PlayerId playerId) {
        Room room = roomRepository.getRoomById(roomId);
        if (room == null) {
            throw new RoomNotFoundException(roomId);
        }
        room.joinRoom(playerId);
        roomRepository.saveRoom(room);
        return room;
    }

    public Room addPlaylist(RoomId roomId, PlayerId playerId, Playlist playlist) {
        Room room = roomRepository.getRoomById(roomId);
        if (room == null) {
            throw new RoomNotFoundException(roomId);
        }
        room.addPlaylist(playerId, playlist);
        roomRepository.saveRoom(room);
        return room;
    }

    public Room removePlaylist(RoomId roomId, PlayerId playerId, PlaylistId playlistId) {
        Room room = roomRepository.getRoomById(roomId);
        if (room == null) {
            throw new RoomNotFoundException(roomId);
        }
        room.removePlaylist(playerId, playlistId);
        roomRepository.saveRoom(room);
        return room;
    }
}
