package interfaces.rest.room;

import interfaces.dto.PlayerDto;
import interfaces.dto.PlaylistDto;

import java.util.List;

public record RoomStateResponse(
        String roomId,
        List<PlayerDto> players,
        List<PlaylistDto> playlists,
        String musicPlayerType
) {
}
