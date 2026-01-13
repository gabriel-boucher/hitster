package interfaces.socket.room.createRoom;

import domain.spotify.accessToken.AccessCode;

public record CreateRoomData(
        AccessCode accessCode
) {
}
