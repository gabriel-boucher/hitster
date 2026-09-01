package interfaces.http.room;

import interfaces.dto.PlayerDto;
import interfaces.dto.PlaylistDto;

import java.util.List;

public record RoomStateResponse(
        String gameId,
        String gameStatus,
        List<PlayerDto> players,
        List<PlaylistDto> playlists,
        String musicPlayerType
) {
}
