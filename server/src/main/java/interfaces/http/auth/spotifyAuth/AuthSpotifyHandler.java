package interfaces.http.auth.spotifyAuth;

import application.AuthAppService;
import domain.exception.GameNotFoundException;
import domain.exception.PlayerNotFoundException;
import infrastructure.musicAuth.spotify.auth.SpotifyAccessTokenException;
import interfaces.dto.responseDto.EventResponse;
import interfaces.dto.responseDto.exceptionDto.BadRequestExceptionResponse;
import interfaces.dto.responseDto.exceptionDto.NotFoundExceptionResponse;
import interfaces.dto.responseDto.successDto.OkSuccessResponse;
import interfaces.http.RestEventHandler;

import static interfaces.dto.responseDto.EventResponseStatus.*;

public class AuthSpotifyHandler implements RestEventHandler<AuthSpotifyRequest> {
    private final AuthAppService authAppService;
    private final AuthSpotifyMapper authSpotifyMapper;

    public AuthSpotifyHandler(AuthAppService authAppService, AuthSpotifyMapper authSpotifyMapper) {
        this.authAppService = authAppService;
        this.authSpotifyMapper = authSpotifyMapper;
    }

    @Override
    public EventResponse handleEvent(AuthSpotifyRequest request) {
        try {
            AuthSpotifyData data = authSpotifyMapper.toDomain(request);
            authAppService.spotifyAuth(data.gameId(), data.playerId(), data.spotifyAccessCode());

            return new OkSuccessResponse<>(SPOTIFY_AUTH, "Spotify authorization successful");
        } catch (GameNotFoundException e) {
            return new NotFoundExceptionResponse(GAME_NOT_FOUND, e.getMessage());
        } catch (PlayerNotFoundException e) {
            return new NotFoundExceptionResponse(PLAYER_NOT_FOUND, e.getMessage());
        } catch (SpotifyAccessTokenException e) {
            return new BadRequestExceptionResponse(SPOTIFY_ACCESS_TOKEN, e.getMessage());
        }
    }
}
