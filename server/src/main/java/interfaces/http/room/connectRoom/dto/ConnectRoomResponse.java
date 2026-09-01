package interfaces.http.room.connectRoom.dto;

import java.util.List;

public record ConnectRoomResponse(
        String playerName,
        List<String> playerNames
) {
}
