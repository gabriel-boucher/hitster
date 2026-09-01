package interfaces.http.room.createRoom.dto;

import domain.game.GameId;

public class CreateRoomMapper {
    public CreateRoomResponse toDto(GameId gameId) {
        return new CreateRoomResponse(gameId.toString());
    }
}
