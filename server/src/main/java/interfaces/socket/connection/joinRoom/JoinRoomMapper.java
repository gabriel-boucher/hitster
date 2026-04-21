package interfaces.socket.connection.joinRoom;

import domain.player.PlayerId;
import domain.room.RoomId;
import interfaces.socket.connection.joinRoom.dto.JoinRoomData;
import interfaces.socket.connection.joinRoom.dto.JoinRoomRequest;

public class JoinRoomMapper {
    public JoinRoomData toDomain(JoinRoomRequest request) {
        return new JoinRoomData(
                RoomId.fromString(request.roomId()),
                PlayerId.fromString(request.playerId())
        );
    }
}
