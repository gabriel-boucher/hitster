package interfaces.http.auth.inMemoryAuth;

import application.AuthAppService;
import domain.exception.PlayerNotFoundException;
import domain.exception.GameNotFoundException;
import interfaces.dto.responseDto.EventResponse;
import interfaces.dto.responseDto.exceptionDto.NotFoundExceptionResponse;
import interfaces.dto.responseDto.successDto.OkSuccessResponse;
import interfaces.http.RestEventHandler;

import static interfaces.dto.responseDto.EventResponseStatus.*;

public class AuthInMemoryHandler implements RestEventHandler<AuthInMemoryRequest> {
    private final AuthAppService authAppService;
    private final AuthInMemoryMapper authInMemoryMapper;

    public AuthInMemoryHandler(AuthAppService authAppService, AuthInMemoryMapper authInMemoryMapper) {
        this.authAppService = authAppService;
        this.authInMemoryMapper = authInMemoryMapper;
    }

    @Override
    public EventResponse handleEvent(AuthInMemoryRequest request) {
        try {
            AuthInMemoryData data = authInMemoryMapper.toDomain(request);
            authAppService.inMemoryAuth(data.gameId(), data.playerId());

            return new OkSuccessResponse<>(IN_MEMORY_AUTH, "In-memory authorization successful");
        } catch (GameNotFoundException e) {
            return new NotFoundExceptionResponse(GAME_NOT_FOUND, e.getMessage());
        } catch (PlayerNotFoundException e) {
            return new NotFoundExceptionResponse(PLAYER_NOT_FOUND, e.getMessage());
        }

    }
}
