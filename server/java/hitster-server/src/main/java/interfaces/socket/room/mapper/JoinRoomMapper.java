package interfaces.socket.room.mapper;

import domain.game.player.PlayerId;
import domain.room.RoomId;
import interfaces.socket.room.dto.joinRoom.JoinRoomData;
import interfaces.socket.room.dto.joinRoom.JoinRoomRequest;

public class JoinRoomMapper {
    public JoinRoomData toDomain(JoinRoomRequest request) {
        return new JoinRoomData(
                RoomId.fromString(request.roomId()),
                PlayerId.fromString(request.playerId())
        );
    }
}
