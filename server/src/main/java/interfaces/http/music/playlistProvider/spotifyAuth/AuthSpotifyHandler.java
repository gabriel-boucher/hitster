package interfaces.http.music.playlistProvider.spotifyAuth;

import application.MusicAuthAppService;
import domain.exception.GameNotFoundException;
import domain.exception.PlayerNotFoundException;
import infrastructure.persistence.inMemory.musicAuth.spotify.auth.SpotifyAccessTokenException;
import interfaces.dto.responseDto.EventResponse;
import interfaces.dto.responseDto.exceptionDto.BadRequestExceptionResponse;
import interfaces.dto.responseDto.exceptionDto.NotFoundExceptionResponse;
import interfaces.dto.responseDto.successDto.OkSuccessResponse;
import interfaces.http.RestEventHandlerWithRequest;

import static interfaces.dto.responseDto.EventResponseStatus.*;

public class AuthSpotifyHandler implements RestEventHandlerWithRequest<AuthSpotifyRequest> {
    private final MusicAuthAppService musicAuthAppService;
    private final AuthSpotifyMapper authSpotifyMapper;

    public AuthSpotifyHandler(MusicAuthAppService musicAuthAppService, AuthSpotifyMapper authSpotifyMapper) {
        this.musicAuthAppService = musicAuthAppService;
        this.authSpotifyMapper = authSpotifyMapper;
    }

    @Override
    public EventResponse handleEvent(String gameId, String playerId, AuthSpotifyRequest request) {
        try {
            AuthSpotifyData data = authSpotifyMapper.toDomain(gameId, playerId, request);
            musicAuthAppService.spotifyAuth(data.gameId(), data.playerId(), data.spotifyAccessCode());

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
