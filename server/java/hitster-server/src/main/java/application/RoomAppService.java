package application;

import domain.exception.RoomNotFoundException;
import domain.player.PlayerFactory;
import domain.player.PlayerId;
import domain.room.Room;
import domain.room.RoomFactory;
import domain.room.RoomId;
import domain.room.RoomRepository;
import domain.spotify.Playlist;
import domain.spotify.PlaylistId;

import java.util.function.Consumer;

public class RoomAppService {
    private final RoomRepository roomRepository;
    private final RoomFactory roomFactory;
    private final PlayerFactory playerFactory;

    public RoomAppService(RoomRepository roomRepository, RoomFactory roomFactory, PlayerFactory playerFactory) {
        this.roomRepository = roomRepository;
        this.roomFactory = roomFactory;
        this.playerFactory = playerFactory;
    }

    public Room createRoom(PlayerId playerId) {
        Room room = roomFactory.create(playerId, playerFactory);
        roomRepository.saveRoom(room);
        return room;
    }

    public Room joinRoom(RoomId roomId, PlayerId playerId) {
        return execute(roomId, room -> room.joinRoom(playerId));
    }

    public Room addPlaylist(RoomId roomId, PlayerId playerId, Playlist playlist) {
        return execute(roomId, room -> room.addPlaylist(playerId, playlist));
    }

    public Room removePlaylist(RoomId roomId, PlayerId playerId, PlaylistId playlistId) {
        return execute(roomId, room -> room.removePlaylist(playerId, playlistId));
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
