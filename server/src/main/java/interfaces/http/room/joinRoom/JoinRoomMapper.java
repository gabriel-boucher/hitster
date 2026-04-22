package interfaces.http.room.joinRoom;

import domain.player.PlayerId;
import domain.room.RoomId;
import interfaces.http.room.joinRoom.dto.JoinRoomData;
import interfaces.http.room.joinRoom.dto.JoinRoomRequest;

public class JoinRoomMapper {
    public JoinRoomData toDomain(JoinRoomRequest request) {
        return new JoinRoomData(
                RoomId.fromString(request.roomId()),
                PlayerId.fromString(request.playerId())
        );
    }
}
