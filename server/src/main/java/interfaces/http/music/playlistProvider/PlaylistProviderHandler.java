package interfaces.http.music.playlistProvider;

import interfaces.dto.responseDto.EventResponse;
import interfaces.dto.responseDto.exceptionDto.NotFoundExceptionResponse;
import interfaces.http.music.playlistProvider.dto.PlaylistProviderRequest;
import interfaces.http.music.playlistProvider.inMemoryAuth.AuthInMemoryHandler;
import interfaces.http.music.playlistProvider.spotifyAuth.AuthSpotifyHandler;
import interfaces.http.music.playlistProvider.spotifyAuth.AuthSpotifyRequest;

import static interfaces.dto.responseDto.EventResponseStatus.AUTH_TYPE_NOT_FOUND;

public class PlaylistProviderHandler {

    private final AuthInMemoryHandler authInMemoryHandler;
    private final AuthSpotifyHandler authSpotifyHandler;

    public PlaylistProviderHandler(AuthInMemoryHandler authInMemoryHandler, AuthSpotifyHandler authSpotifyHandler) {
        this.authInMemoryHandler = authInMemoryHandler;
        this.authSpotifyHandler = authSpotifyHandler;
    }

    public EventResponse handleEvent(String gameId, String playerId, String authType, PlaylistProviderRequest playlistProviderRequest) {
        return switch (authType) {
            case "in-memory" -> authInMemoryHandler.handleEvent(gameId, playerId);
            case "spotify" -> {
                AuthSpotifyRequest request = new AuthSpotifyRequest(playlistProviderRequest.accessCode());
                yield authSpotifyHandler.handleEvent(gameId, playerId, request);
            }
            default -> new NotFoundExceptionResponse(AUTH_TYPE_NOT_FOUND, "Auth type not found");
        };
    }
}
