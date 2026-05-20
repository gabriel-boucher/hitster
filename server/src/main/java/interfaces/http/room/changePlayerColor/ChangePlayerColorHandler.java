package interfaces.http.room.changePlayerColor;

import application.RoomAppService;
import domain.exception.InvalidGameStatusException;
import domain.exception.PlayerNotFoundException;
import domain.exception.GameNotFoundException;
import domain.room.exception.PlayerColorAlreadyExistsException;
import interfaces.dto.responseDto.EventResponse;
import interfaces.dto.responseDto.exceptionDto.BadRequestExceptionResponse;
import interfaces.dto.responseDto.exceptionDto.NotFoundExceptionResponse;
import interfaces.dto.responseDto.successDto.OkSuccessResponse;
import interfaces.http.RestEventHandler;
import interfaces.http.room.changePlayerColor.dto.ChangePlayerColorData;
import interfaces.http.room.changePlayerColor.dto.ChangePlayerColorRequest;

import static interfaces.dto.responseDto.EventResponseStatus.*;

public class ChangePlayerColorHandler implements RestEventHandler<ChangePlayerColorRequest> {
    private final RoomAppService roomAppService;
    private final ChangePlayerColorMapper changePlayerColorMapper;

    public ChangePlayerColorHandler(RoomAppService roomAppService, ChangePlayerColorMapper changePlayerColorMapper) {
        this.roomAppService = roomAppService;
        this.changePlayerColorMapper = changePlayerColorMapper;
    }

    @Override
    public EventResponse handleEvent(ChangePlayerColorRequest request) {
        try {
            ChangePlayerColorData data = changePlayerColorMapper.toDomain(request);
            roomAppService.changePlayerColor(data.gameId(), data.playerId(), data.newColor());

            return new OkSuccessResponse<>(CHANGE_PLAYER_COLOR, "Player color changed successfully");
        } catch (GameNotFoundException e) {
            return new NotFoundExceptionResponse(GAME_NOT_FOUND, e.getMessage());
        } catch (PlayerNotFoundException e) {
            return new NotFoundExceptionResponse(PLAYER_NOT_FOUND, e.getMessage());
        } catch (InvalidGameStatusException e) {
            return new BadRequestExceptionResponse(INVALID_GAME_STATUS, e.getMessage());
        } catch (PlayerColorAlreadyExistsException e) {
            return new BadRequestExceptionResponse(PLAYER_COLOR_ALREADY_EXISTS, e.getMessage());
        }
    }
}
