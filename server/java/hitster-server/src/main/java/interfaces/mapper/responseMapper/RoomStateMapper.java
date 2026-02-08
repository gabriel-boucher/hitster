package interfaces.mapper.responseMapper;

import domain.room.Room;
import interfaces.mapper.PlayerMapper;
import interfaces.mapper.PlaylistMapper;
import interfaces.socket.room.RoomStateResponse;

public class RoomStateMapper {
    private final PlayerMapper playerMapper;
    private final PlaylistMapper playlistMapper;

    public RoomStateMapper(PlayerMapper playerMapper, PlaylistMapper playlistMapper) {
        this.playerMapper = playerMapper;
        this.playlistMapper = playlistMapper;
    }

    public RoomStateResponse toDto(Room room) {
        return new RoomStateResponse(
                room.getId().toString(),
                room.getPlayers().stream().map(playerMapper::toDto).toList(),
                room.getPlaylists().stream().map(playlistMapper::toDto).toList()
        );
    }
}
