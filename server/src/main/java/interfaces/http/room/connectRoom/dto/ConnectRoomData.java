package interfaces.http.room.connectRoom.dto;

import domain.game.GameId;

public record ConnectRoomData(
        GameId gameId
) {
}