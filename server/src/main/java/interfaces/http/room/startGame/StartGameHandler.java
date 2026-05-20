package interfaces.http.room.startGame;

import application.RoomAppService;
import domain.exception.InvalidGameStatusException;
import domain.exception.PlayerNotFoundException;
import domain.exception.GameNotFoundException;
import domain.room.exception.NoPlaylistSelectedException;
import domain.room.exception.PlayerHostMustStartGameException;
import domain.room.exception.PlayerNameNotSetException;
import infrastructure.music.exception.getPlaylistItems.GetPlaylistItemsSpotifyException;
import interfaces.dto.responseDto.EventResponse;
import interfaces.dto.responseDto.exceptionDto.BadRequestExceptionResponse;
import interfaces.dto.responseDto.exceptionDto.NotFoundExceptionResponse;
import interfaces.dto.responseDto.exceptionDto.UnauthorizedExceptionResponse;
import interfaces.dto.responseDto.successDto.OkSuccessResponse;
import interfaces.http.RestEventHandler;
import interfaces.http.room.startGame.dto.StartGameData;
import interfaces.http.room.startGame.dto.StartGameRequest;

import static interfaces.dto.responseDto.EventResponseStatus.*;

public class StartGameHandler implements RestEventHandler<StartGameRequest> {
    private final RoomAppService roomAppService;
    private final StartGameMapper startGameMapper;

    public StartGameHandler(RoomAppService roomAppService, StartGameMapper startGameMapper) {
        this.roomAppService = roomAppService;
        this.startGameMapper = startGameMapper;
    }

    @Override
    public EventResponse handleEvent(StartGameRequest request) {
        try {
            StartGameData data = startGameMapper.toDomain(request);
            roomAppService.startGame(data.gameId(), data.playerId());

            return new OkSuccessResponse<>(START_GAME, "Game started successfully");
        } catch (GameNotFoundException e) {
            return new NotFoundExceptionResponse(GAME_NOT_FOUND, e.getMessage());
        } catch (PlayerNotFoundException e) {
            return new NotFoundExceptionResponse(PLAYER_NOT_FOUND, e.getMessage());
        } catch (InvalidGameStatusException e) {
            return new BadRequestExceptionResponse(INVALID_GAME_STATUS, e.getMessage());
        } catch (PlayerHostMustStartGameException e) {
            return new BadRequestExceptionResponse(PLAYER_HOST_MUST_START_GAME, e.getMessage());
        } catch (NoPlaylistSelectedException e) {
            return new BadRequestExceptionResponse(NO_PLAYLIST_SELECTED, e.getMessage());
        } catch (PlayerNameNotSetException e) {
            return new BadRequestExceptionResponse(PLAYER_NAME_NOT_SET, e.getMessage());
        } catch (GetPlaylistItemsSpotifyException e) {
            return new UnauthorizedExceptionResponse(SPOTIFY_API_GET_PLAYLIST_ITEMS, e.getMessage());
        }
    }
}
