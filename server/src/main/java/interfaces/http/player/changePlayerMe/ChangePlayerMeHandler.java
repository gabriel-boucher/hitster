package interfaces.http.player.changePlayerMe;

import application.RoomAppService;
import domain.exception.GameNotFoundException;
import domain.exception.InvalidGameStatusException;
import domain.exception.PlayerNotFoundException;
import domain.room.exception.PlayerColorAlreadyExistsException;
import domain.room.exception.PlayerNameAlreadyExistsException;
import interfaces.dto.responseDto.EventResponse;
import interfaces.dto.responseDto.exceptionDto.BadRequestExceptionResponse;
import interfaces.dto.responseDto.exceptionDto.NotFoundExceptionResponse;
import interfaces.dto.responseDto.successDto.OkSuccessResponse;
import interfaces.http.RestEventHandlerWithRequest;
import interfaces.http.player.changePlayerMe.dto.ChangePlayerMeData;
import interfaces.http.player.changePlayerMe.dto.ChangePlayerMeRequest;

import static interfaces.dto.responseDto.EventResponseStatus.*;

public class ChangePlayerMeHandler implements RestEventHandlerWithRequest<ChangePlayerMeRequest> {
    private final RoomAppService roomAppService;
    private final ChangePlayerMeMapper changePlayerMeMapper;

    public ChangePlayerMeHandler(RoomAppService roomAppService, ChangePlayerMeMapper changePlayerMeMapper) {
        this.roomAppService = roomAppService;
        this.changePlayerMeMapper = changePlayerMeMapper;
    }

    @Override
    public EventResponse handleEvent(String gameId, String playerId, ChangePlayerMeRequest request) {
        try {
            ChangePlayerMeData data = changePlayerMeMapper.toDomain(gameId, playerId, request);
            roomAppService.changePlayerMe(data.gameId(), data.playerId(), data.newName(), data.newColor());

            return new OkSuccessResponse<>(CHANGE_PLAYER_ME, "Player updated successfully");
        } catch (GameNotFoundException e) {
            return new NotFoundExceptionResponse(GAME_NOT_FOUND, e.getMessage());
        } catch (PlayerNotFoundException e) {
            return new NotFoundExceptionResponse(PLAYER_NOT_FOUND, e.getMessage());
        } catch (InvalidGameStatusException e) {
            return new BadRequestExceptionResponse(INVALID_GAME_STATUS, e.getMessage());
        } catch (PlayerNameAlreadyExistsException e) {
            return new BadRequestExceptionResponse(PLAYER_NAME_ALREADY_EXISTS, e.getMessage());
        } catch (PlayerColorAlreadyExistsException e) {
            return new BadRequestExceptionResponse(PLAYER_COLOR_ALREADY_EXISTS, e.getMessage());
        }
    }
}
