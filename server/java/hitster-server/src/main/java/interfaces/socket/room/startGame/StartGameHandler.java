package interfaces.socket.room.startGame;

import application.RoomAppService;
import com.corundumstudio.socketio.AckRequest;
import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.SocketIOServer;
import domain.exception.InvalidGameStatusException;
import domain.exception.PlayerNotFoundException;
import domain.exception.RoomNotFoundException;
import domain.game.Game;
import domain.room.exception.NoPlaylistSelectedException;
import domain.room.exception.PlayerHostMustStartGameException;
import domain.room.exception.PlayerNameNotSetException;
import infrastructure.playlist.exception.getPlaylistItems.SpotifyApiGetPlaylistItemsException;
import interfaces.dto.responseDto.exceptionDto.BadRequestExceptionResponse;
import interfaces.dto.responseDto.exceptionDto.NotFoundExceptionResponse;
import interfaces.dto.responseDto.exceptionDto.UnauthorizedExceptionResponse;
import interfaces.mapper.GameStateMapper;
import interfaces.mapper.RoomStateMapper;
import interfaces.socket.SocketEventHandler;
import interfaces.socket.room.RoomSocketEventHandler;
import interfaces.socket.room.startGame.dto.StartGameData;
import interfaces.socket.room.startGame.dto.StartGameRequest;

import static interfaces.dto.responseDto.EventResponseStatus.*;

public class StartGameHandler extends RoomSocketEventHandler implements SocketEventHandler<StartGameRequest> {
    private final StartGameMapper startGameMapper;

    public StartGameHandler(RoomAppService roomAppService, RoomStateMapper roomStateMapper, GameStateMapper gameStateMapper, StartGameMapper startGameMapper) {
        super(roomAppService, roomStateMapper, gameStateMapper);
        this.startGameMapper = startGameMapper;
    }

    @Override
    public void handleEvent(SocketIOServer server, SocketIOClient client, StartGameRequest request, AckRequest ackRequest) {
        try {
            StartGameData data = startGameMapper.toDomain(request);
            Game game = roomAppService.startGame(data.roomId(), data.playerId());
            client.joinRoom(game.getId().toString());

            broadcastGameState(game, server);
        } catch (RoomNotFoundException e) {
            ackRequest.sendAckData(new NotFoundExceptionResponse(ROOM_NOT_FOUND, e.getMessage()));
        } catch (PlayerNotFoundException e) {
            ackRequest.sendAckData(new NotFoundExceptionResponse(PLAYER_NOT_FOUND, e.getMessage()));
        } catch (InvalidGameStatusException e) {
            ackRequest.sendAckData(new BadRequestExceptionResponse(INVALID_GAME_STATUS, e.getMessage()));
        } catch (PlayerHostMustStartGameException e) {
            ackRequest.sendAckData(new BadRequestExceptionResponse(PLAYER_HOST_MUST_START_GAME, e.getMessage()));
        } catch (NoPlaylistSelectedException e) {
            ackRequest.sendAckData(new BadRequestExceptionResponse(NO_PLAYLIST_SELECTED, e.getMessage()));
        } catch (PlayerNameNotSetException e) {
            ackRequest.sendAckData(new BadRequestExceptionResponse(PLAYER_NAME_NOT_SET, e.getMessage()));
        } catch (SpotifyApiGetPlaylistItemsException e) {
            ackRequest.sendAckData(new UnauthorizedExceptionResponse(SPOTIFY_API_GET_PLAYLIST_ITEMS, e.getMessage()));
        }
    }
}
