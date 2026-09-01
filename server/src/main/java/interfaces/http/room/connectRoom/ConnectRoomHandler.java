package interfaces.http.room.connectRoom;

import application.RoomAppService;
import domain.exception.GameNotFoundException;
import domain.player.Player;
import interfaces.dto.responseDto.EventResponse;
import interfaces.dto.responseDto.exceptionDto.NotFoundExceptionResponse;
import interfaces.dto.responseDto.successDto.OkSuccessResponse;
import interfaces.http.RestEventHandler;
import interfaces.http.room.connectRoom.dto.ConnectRoomData;
import interfaces.http.room.connectRoom.dto.ConnectRoomResponse;

import java.util.List;

import static interfaces.dto.responseDto.EventResponseStatus.*;

public class ConnectRoomHandler implements RestEventHandler {
    private final RoomAppService roomAppService;
    private final ConnectRoomMapper connectRoomMapper;

    public ConnectRoomHandler(RoomAppService roomAppService, ConnectRoomMapper connectRoomMapper) {
        this.roomAppService = roomAppService;
        this.connectRoomMapper = connectRoomMapper;
    }

    @Override
    public EventResponse handleEvent(String gameId, String playerId) {
        try {
            ConnectRoomData data = connectRoomMapper.toDomain(gameId);
            List<Player> players = roomAppService.connectGame(data.gameId());
            ConnectRoomResponse response = connectRoomMapper.toDto(playerId, players);

            return new OkSuccessResponse<>(CONNECT_ROOM, response);
        } catch (GameNotFoundException  | IllegalArgumentException e) { // room not found | uuid mapper
            return new NotFoundExceptionResponse(GAME_NOT_FOUND, e.getMessage());
        }
    }
}
