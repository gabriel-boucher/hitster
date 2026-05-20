package interfaces.http.game.removeToken;

import application.GameAppService;
import domain.exception.InvalidGameStatusException;
import domain.exception.PlayerNotFoundException;
import domain.exception.GameNotFoundException;
import domain.game.currentDeck.exception.TokenAlreadyInPlayerDeckException;
import interfaces.dto.responseDto.EventResponse;
import interfaces.dto.responseDto.exceptionDto.BadRequestExceptionResponse;
import interfaces.dto.responseDto.exceptionDto.NotFoundExceptionResponse;
import interfaces.dto.responseDto.successDto.OkSuccessResponse;
import interfaces.http.RestEventHandler;
import interfaces.http.game.removeToken.dto.RemoveTokenData;
import interfaces.http.game.removeToken.dto.RemoveTokenRequest;

import static interfaces.dto.responseDto.EventResponseStatus.*;

public class RemoveTokenHandler implements RestEventHandler<RemoveTokenRequest> {
    private final GameAppService gameAppService;
    private final RemoveTokenMapper removeTokenMapper;

    public RemoveTokenHandler(GameAppService gameAppService, RemoveTokenMapper removeTokenMapper) {
        this.gameAppService = gameAppService;
        this.removeTokenMapper = removeTokenMapper;
    }

    @Override
    public EventResponse handleEvent(RemoveTokenRequest request) {
        try {
            RemoveTokenData data = removeTokenMapper.toDomain(request);
            gameAppService.removeToken(data.gameId(), data.playerId(), data.tokenId());

            return new OkSuccessResponse<>(REMOVE_TOKEN, "Token removed successfully");
        } catch (GameNotFoundException e) {
            return new NotFoundExceptionResponse(GAME_NOT_FOUND, e.getMessage());
        } catch (PlayerNotFoundException e) {
            return new NotFoundExceptionResponse(PLAYER_NOT_FOUND, e.getMessage());
        } catch (InvalidGameStatusException e) {
            return new BadRequestExceptionResponse(INVALID_GAME_STATUS, e.getMessage());
        } catch (TokenAlreadyInPlayerDeckException e) {
            return new BadRequestExceptionResponse(TOKEN_ALREADY_IN_PLAYER_DECK, e.getMessage());
        }
    }
}

