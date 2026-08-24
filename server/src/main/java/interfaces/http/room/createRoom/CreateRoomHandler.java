package interfaces.http.room.createRoom;

import application.RoomAppService;
import domain.room.Room;
import infrastructure.persistence.inMemory.musicAuth.spotify.auth.SpotifyAccessTokenException;
import interfaces.dto.responseDto.EventResponse;
import interfaces.dto.responseDto.exceptionDto.UnauthorizedExceptionResponse;
import interfaces.dto.responseDto.successDto.CreatedSuccessResponse;
import interfaces.http.RestEventHandler;
import interfaces.http.room.createRoom.dto.CreateRoomResponse;

import static interfaces.dto.responseDto.EventResponseStatus.*;

public class CreateRoomHandler implements RestEventHandler {
    private final RoomAppService roomAppService;

    public CreateRoomHandler(RoomAppService roomAppService) {
        this.roomAppService = roomAppService;
    }

    @Override
    public EventResponse handleEvent(String gameId, String playerId) {
        try {
            Room room = roomAppService.createGame();
            System.out.println("Create room : GameId = " + room.getId().toString());

            return new CreatedSuccessResponse<>(CREATE_ROOM, new CreateRoomResponse(room.getId().toString()));
        } catch (SpotifyAccessTokenException e) {
            return new UnauthorizedExceptionResponse(UNAUTHORIZED_ACCESS_TOKEN, e.getMessage());
        }
    }
}
