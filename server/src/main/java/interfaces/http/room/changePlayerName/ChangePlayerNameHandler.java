package interfaces.http.room.changePlayerName;

import application.RoomAppService;
import domain.exception.GameNotFoundException;
import domain.exception.InvalidGameStatusException;
import domain.exception.PlayerNotFoundException;
import domain.room.exception.PlayerNameAlreadyExistsException;
import interfaces.dto.responseDto.EventResponse;
import interfaces.dto.responseDto.exceptionDto.BadRequestExceptionResponse;
import interfaces.dto.responseDto.exceptionDto.NotFoundExceptionResponse;
import interfaces.dto.responseDto.successDto.OkSuccessResponse;
import interfaces.http.RestEventHandler;
import interfaces.http.room.changePlayerName.dto.ChangePlayerNameData;
import interfaces.http.room.changePlayerName.dto.ChangePlayerNameRequest;

import static interfaces.dto.responseDto.EventResponseStatus.*;

public class ChangePlayerNameHandler implements RestEventHandler<ChangePlayerNameRequest> {
    private final RoomAppService roomAppService;
    private final ChangePlayerNameMapper changePlayerNameMapper;

    public ChangePlayerNameHandler(RoomAppService roomAppService, ChangePlayerNameMapper changePlayerNameMapper) {
        this.roomAppService = roomAppService;
        this.changePlayerNameMapper = changePlayerNameMapper;
    }

    @Override
    public EventResponse handleEvent(ChangePlayerNameRequest request) {
        try {
            ChangePlayerNameData data = changePlayerNameMapper.toDomain(request);
            roomAppService.changePlayerName(data.gameId(), data.playerId(), data.newName());

            return new OkSuccessResponse<>(CHANGE_PLAYER_NAME, "Player name changed successfully");
        } catch (GameNotFoundException e) {
            return new NotFoundExceptionResponse(GAME_NOT_FOUND, e.getMessage());
        } catch (PlayerNotFoundException e) {
            return new NotFoundExceptionResponse(PLAYER_NOT_FOUND, e.getMessage());
        } catch (InvalidGameStatusException e) {
            return new BadRequestExceptionResponse(INVALID_GAME_STATUS, e.getMessage());
        } catch (PlayerNameAlreadyExistsException e) {
            return new BadRequestExceptionResponse(PLAYER_NAME_ALREADY_EXISTS, e.getMessage());
        }
    }
}
