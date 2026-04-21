package interfaces.rest.room.createRoom;

import application.RoomAppService;
import domain.room.Room;
import infrastructure.musicAuth.spotify.auth.SpotifyAccessTokenException;
import interfaces.dto.responseDto.EventResponse;
import interfaces.dto.responseDto.exceptionDto.UnauthorizedExceptionResponse;
import interfaces.dto.responseDto.successDto.CreatedSuccessResponse;
import interfaces.rest.RestEventHandler;
import interfaces.rest.room.createRoom.dto.CreateRoomRequest;
import interfaces.rest.room.createRoom.dto.CreateRoomResponse;

import static interfaces.dto.responseDto.EventResponseStatus.*;

public class CreateRoomHandler implements RestEventHandler<CreateRoomRequest> {
    private final RoomAppService roomAppService;

    public CreateRoomHandler(RoomAppService roomAppService) {
        this.roomAppService = roomAppService;
    }

    @Override
    public EventResponse handleEvent(CreateRoomRequest request) {
        try {
            Room room = roomAppService.createRoom();
            System.out.println("Create room : RoomId = " + room.getId().toString());

            return new CreatedSuccessResponse<>(CREATE_ROOM, new CreateRoomResponse(room.getId().toString()));
        } catch (SpotifyAccessTokenException e) {
            return new UnauthorizedExceptionResponse(UNAUTHORIZED_ACCESS_TOKEN, e.getMessage());
        }
    }
}
