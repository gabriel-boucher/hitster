package interfaces.http.room.joinRoom;

import domain.connection.ConnectionId;
import domain.game.GameId;
import domain.player.PlayerId;
import interfaces.http.room.joinRoom.dto.JoinRoomData;
import interfaces.http.room.joinRoom.dto.JoinRoomRequest;

public class JoinRoomMapper {
    public JoinRoomData toDomain(String gameId, String playerId, JoinRoomRequest request) {
        return new JoinRoomData(
                GameId.fromString(gameId),
                playerId.isEmpty() ?
                        PlayerId.create() :
                        PlayerId.fromString(playerId),
                ConnectionId.fromString(request.socketId()),
                request.playerName()
        );
    }
}
