package interfaces.rest.room.startGame;

import application.RoomAppService;
import domain.exception.InvalidGameStatusException;
import domain.exception.PlayerNotFoundException;
import domain.exception.RoomNotFoundException;
import domain.game.Game;
import domain.room.exception.NoPlaylistSelectedException;
import domain.room.exception.PlayerHostMustStartGameException;
import domain.room.exception.PlayerNameNotSetException;
import infrastructure.music.exception.getPlaylistItems.GetPlaylistItemsSpotifyException;
import interfaces.dto.responseDto.EventResponse;
import interfaces.dto.responseDto.exceptionDto.BadRequestExceptionResponse;
import interfaces.dto.responseDto.exceptionDto.NotFoundExceptionResponse;
import interfaces.dto.responseDto.exceptionDto.UnauthorizedExceptionResponse;
import interfaces.dto.responseDto.successDto.OkSuccessResponse;
import interfaces.rest.RestEventHandler;
import interfaces.socket.SocketEventBroadcaster;
import interfaces.socket.SocketIOServerHolder;
import interfaces.rest.room.startGame.dto.StartGameData;
import interfaces.rest.room.startGame.dto.StartGameRequest;

import static interfaces.dto.responseDto.EventResponseStatus.*;

public class StartGameHandler implements RestEventHandler<StartGameRequest> {
    private final RoomAppService roomAppService;
    private final StartGameMapper startGameMapper;
    private final SocketEventBroadcaster socketEventBroadcaster;
    private final SocketIOServerHolder socketIOServerHolder;

    public StartGameHandler(RoomAppService roomAppService, StartGameMapper startGameMapper, SocketEventBroadcaster socketEventBroadcaster, SocketIOServerHolder socketIOServerHolder) {
        this.roomAppService = roomAppService;
        this.startGameMapper = startGameMapper;
        this.socketEventBroadcaster = socketEventBroadcaster;
        this.socketIOServerHolder = socketIOServerHolder;
    }

    @Override
    public EventResponse handleEvent(StartGameRequest request) {
        try {
            StartGameData data = startGameMapper.toDomain(request);
            Game game = roomAppService.startGame(data.roomId(), data.playerId());

            socketEventBroadcaster.broadcastGameState(game, socketIOServerHolder.getSocketIOServer());

            return new OkSuccessResponse<>(START_GAME, "Game started successfully");
        } catch (RoomNotFoundException e) {
            return new NotFoundExceptionResponse(ROOM_NOT_FOUND, e.getMessage());
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
