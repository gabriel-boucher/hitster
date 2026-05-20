package interfaces.http.room.joinRoom;

import domain.connection.ConnectionId;
import domain.game.GameId;
import domain.player.PlayerId;
import interfaces.http.room.joinRoom.dto.JoinRoomData;
import interfaces.http.room.joinRoom.dto.JoinRoomRequest;

public class JoinRoomMapper {
    public JoinRoomData toDomain(JoinRoomRequest request) {
        return new JoinRoomData(
                GameId.fromString(request.gameId()),
                request.playerId().isEmpty() ?
                        PlayerId.create() :
                        PlayerId.fromString(request.playerId()),
                ConnectionId.fromString(request.socketId())
        );
    }
}
