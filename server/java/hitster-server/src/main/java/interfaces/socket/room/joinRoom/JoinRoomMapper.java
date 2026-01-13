package interfaces.socket.room.joinRoom;

import domain.player.PlayerId;
import domain.room.RoomId;

public class JoinRoomMapper {
    public JoinRoomData toDomain(JoinRoomRequest request) {
        return new JoinRoomData(
                RoomId.fromString(request.roomId()),
                PlayerId.fromString(request.playerId())
        );
    }
}
