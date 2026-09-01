package interfaces.http.room.createRoom;

import application.RoomAppService;
import domain.game.GameId;
import domain.room.Room;
import infrastructure.persistence.inMemory.musicAuth.spotify.auth.SpotifyAccessTokenException;
import interfaces.dto.responseDto.EventResponse;
import interfaces.dto.responseDto.exceptionDto.UnauthorizedExceptionResponse;
import interfaces.dto.responseDto.successDto.CreatedSuccessResponse;
import interfaces.http.RestEventHandler;
import interfaces.http.room.createRoom.dto.CreateRoomMapper;
import interfaces.http.room.createRoom.dto.CreateRoomResponse;

import static interfaces.dto.responseDto.EventResponseStatus.*;

public class CreateRoomHandler {
    private final RoomAppService roomAppService;
    private final CreateRoomMapper createRoomMapper;

    public CreateRoomHandler(RoomAppService roomAppService, CreateRoomMapper createRoomMapper) {
        this.roomAppService = roomAppService;
        this.createRoomMapper = createRoomMapper;
    }

    public EventResponse handleEvent() {
        try {
            GameId gameId = roomAppService.createGame();
            CreateRoomResponse response = createRoomMapper.toDto(gameId);

            return new CreatedSuccessResponse<>(CREATE_ROOM, response);
        } catch (SpotifyAccessTokenException e) {
            return new UnauthorizedExceptionResponse(UNAUTHORIZED_ACCESS_TOKEN, e.getMessage());
        }
    }
}
