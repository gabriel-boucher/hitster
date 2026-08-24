package interfaces.http.player.removePlayer;

import application.RoomAppService;
import domain.exception.InvalidGameStatusException;
import domain.exception.PlayerNotFoundException;
import domain.exception.GameNotFoundException;
import domain.room.exception.PlayerHostCannotBeRemovedException;
import interfaces.dto.responseDto.EventResponse;
import interfaces.dto.responseDto.exceptionDto.BadRequestExceptionResponse;
import interfaces.dto.responseDto.exceptionDto.NotFoundExceptionResponse;
import interfaces.dto.responseDto.successDto.OkSuccessResponse;
import interfaces.http.RestEventHandlerWithRequest;
import interfaces.http.player.removePlayer.dto.RemovePlayerData;
import interfaces.http.player.removePlayer.dto.RemovePlayerRequest;

import static interfaces.dto.responseDto.EventResponseStatus.*;

public class RemovePlayerHandler implements RestEventHandlerWithRequest<RemovePlayerRequest> {
    private final RoomAppService roomAppService;
    private final RemovePlayerMapper removePlayerMapper;

    public RemovePlayerHandler(RoomAppService roomAppService, RemovePlayerMapper removePlayerMapper) {
        this.roomAppService = roomAppService;
        this.removePlayerMapper = removePlayerMapper;
    }

    @Override
    public EventResponse handleEvent(String gameId, String playerId, RemovePlayerRequest request) {
        try {
            RemovePlayerData data = removePlayerMapper.toDomain(gameId, playerId, request);
            roomAppService.kickPlayer(data.gameId(), data.playerId(), data.playerToRemoveId());

            return new OkSuccessResponse<>(REMOVE_PLAYER, "Player removed successfully");
        } catch (GameNotFoundException e) {
            return new NotFoundExceptionResponse(GAME_NOT_FOUND, e.getMessage());
        } catch (PlayerNotFoundException e) {
            return new NotFoundExceptionResponse(PLAYER_NOT_FOUND, e.getMessage());
        } catch (InvalidGameStatusException e) {
            return new BadRequestExceptionResponse(INVALID_GAME_STATUS, e.getMessage());
        } catch (PlayerHostCannotBeRemovedException e) {
            return new BadRequestExceptionResponse(PLAYER_HOST_CANNOT_BE_REMOVED, e.getMessage());
        }
    }
}
