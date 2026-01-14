package interfaces.socket.room.createRoom.dto;

import domain.spotify.accessToken.AccessCode;

public record CreateRoomData(
        AccessCode accessCode
) {
}
