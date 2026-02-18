package interfaces.rest.auth.spotifyAuth;

import application.AuthAppService;
import domain.exception.PlayerNotFoundException;
import domain.exception.RoomNotFoundException;
import domain.room.Room;
import infrastructure.musicAuth.spotify.auth.SpotifyAccessTokenException;
import interfaces.dto.responseDto.EventResponse;
import interfaces.dto.responseDto.exceptionDto.BadRequestExceptionResponse;
import interfaces.dto.responseDto.exceptionDto.NotFoundExceptionResponse;
import interfaces.dto.responseDto.successDto.OkSuccessResponse;
import interfaces.rest.RestEventHandler;
import interfaces.socket.SocketEventBroadcaster;
import interfaces.socket.SocketIOServerHolder;

import static interfaces.dto.responseDto.EventResponseStatus.*;

public class AuthSpotifyHandler implements RestEventHandler<AuthSpotifyRequest> {
    private final AuthAppService authAppService;
    private final AuthSpotifyMapper authSpotifyMapper;
    private final SocketEventBroadcaster socketEventBroadcaster;
    private final SocketIOServerHolder socketIOServerHolder;

    public AuthSpotifyHandler(AuthAppService authAppService, AuthSpotifyMapper authSpotifyMapper, SocketEventBroadcaster socketEventBroadcaster, SocketIOServerHolder socketIOServerHolder) {
        this.authAppService = authAppService;
        this.authSpotifyMapper = authSpotifyMapper;
        this.socketEventBroadcaster = socketEventBroadcaster;
        this.socketIOServerHolder = socketIOServerHolder;
    }

    @Override
    public EventResponse handleEvent(AuthSpotifyRequest request) {
        try {
            AuthSpotifyData data = authSpotifyMapper.toDomain(request);
            Room room = authAppService.spotifyAuth(data.roomId(), data.playerId(), data.spotifyAccessCode());

            socketEventBroadcaster.broadcastRoomState(room, socketIOServerHolder.getSocketIOServer());

            return new OkSuccessResponse<>(SPOTIFY_AUTH, "Spotify authorization successful");
        } catch (RoomNotFoundException e) {
            return new NotFoundExceptionResponse(ROOM_NOT_FOUND, e.getMessage());
        } catch (PlayerNotFoundException e) {
            return new NotFoundExceptionResponse(PLAYER_NOT_FOUND, e.getMessage());
        } catch (SpotifyAccessTokenException e) {
            return new BadRequestExceptionResponse(SPOTIFY_ACCESS_TOKEN, e.getMessage());
        }
    }
}
