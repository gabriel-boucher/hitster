package interfaces.http.music.playlistProvider.inMemoryAuth;

import application.MusicAuthAppService;
import domain.exception.PlayerNotFoundException;
import domain.exception.GameNotFoundException;
import interfaces.dto.responseDto.EventResponse;
import interfaces.dto.responseDto.exceptionDto.NotFoundExceptionResponse;
import interfaces.dto.responseDto.successDto.OkSuccessResponse;
import interfaces.http.RestEventHandler;

import static interfaces.dto.responseDto.EventResponseStatus.*;

public class AuthInMemoryHandler implements RestEventHandler {
    private final MusicAuthAppService musicAuthAppService;
    private final AuthInMemoryMapper authInMemoryMapper;

    public AuthInMemoryHandler(MusicAuthAppService musicAuthAppService, AuthInMemoryMapper authInMemoryMapper) {
        this.musicAuthAppService = musicAuthAppService;
        this.authInMemoryMapper = authInMemoryMapper;
    }

    @Override
    public EventResponse handleEvent(String gameId, String playerId) {
        try {
            AuthInMemoryData data = authInMemoryMapper.toDomain(gameId, playerId);
            musicAuthAppService.inMemoryAuth(data.gameId(), data.playerId());

            return new OkSuccessResponse<>(IN_MEMORY_AUTH, "In-memory authorization successful");
        } catch (GameNotFoundException e) {
            return new NotFoundExceptionResponse(GAME_NOT_FOUND, e.getMessage());
        } catch (PlayerNotFoundException e) {
            return new NotFoundExceptionResponse(PLAYER_NOT_FOUND, e.getMessage());
        }
    }
}
