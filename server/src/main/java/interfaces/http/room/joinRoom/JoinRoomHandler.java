package interfaces.http.room.joinRoom;

import application.RoomAppService;
import domain.exception.ConnectionNotFoundException;
import domain.exception.InvalidGameStatusException;
import domain.exception.GameNotFoundException;
import domain.player.PlayerId;
import domain.room.exception.PlayerAlreadyInRoomException;
import interfaces.dto.responseDto.EventResponse;
import interfaces.dto.responseDto.exceptionDto.BadRequestExceptionResponse;
import interfaces.dto.responseDto.exceptionDto.NotFoundExceptionResponse;
import interfaces.dto.responseDto.successDto.OkSuccessResponse;
import interfaces.filter.auth.BearerTokenProvider;
import interfaces.http.RestEventHandler;
import interfaces.http.RestEventHandlerWithRequest;
import interfaces.http.room.joinRoom.dto.JoinRoomData;
import interfaces.http.room.joinRoom.dto.JoinRoomRequest;

import static interfaces.dto.responseDto.EventResponseStatus.*;

public class JoinRoomHandler implements RestEventHandlerWithRequest<JoinRoomRequest> {
    private final RoomAppService roomAppService;
    private final JoinRoomMapper joinRoomMapper;
    private final BearerTokenProvider bearerTokenProvider = new BearerTokenProvider();

    public JoinRoomHandler(RoomAppService roomAppService, JoinRoomMapper joinRoomMapper) {
        this.roomAppService = roomAppService;
        this.joinRoomMapper = joinRoomMapper;
    }

    @Override
    public EventResponse handleEvent(String gameId, String playerId, JoinRoomRequest request) {
        try {
            JoinRoomData data = joinRoomMapper.toDomain(gameId, playerId, request);
            PlayerId pId = roomAppService.joinGame(data.connectionId(), data.gameId(), data.playerId());

            String token = bearerTokenProvider.generate(pId, data.gameId());

            return new OkSuccessResponse<>(JOIN_ROOM, token);
        } catch (GameNotFoundException | IllegalArgumentException e) { // room not found | uuid mapper
            return new NotFoundExceptionResponse(GAME_NOT_FOUND, e.getMessage());
        } catch (ConnectionNotFoundException e) {
            return new NotFoundExceptionResponse(CONNECTION_NOT_FOUND, e.getMessage());
        } catch (PlayerAlreadyInRoomException e) {
            return new BadRequestExceptionResponse(PLAYER_ALREADY_IN_ROOM, e.getMessage());
        } catch (InvalidGameStatusException e) {
            return new BadRequestExceptionResponse(INVALID_GAME_STATUS, e.getMessage());
        }
    }
}