package interfaces.http.room.joinRoom.dto;

import domain.connection.ConnectionId;
import domain.game.GameId;
import domain.player.PlayerId;

public record JoinRoomData(
        GameId gameId,
        PlayerId playerId,
        ConnectionId connectionId
) {
}
