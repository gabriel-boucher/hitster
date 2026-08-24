package interfaces.http.deckMovement.tokenMovement.addToken;

import application.GameAppService;
import domain.exception.GameNotFoundException;
import domain.exception.InvalidGameStatusException;
import domain.exception.PlayerNotFoundException;
import domain.deck.currentDeck.exception.TokenAlreadyInCurrentDeckException;
import interfaces.dto.responseDto.EventResponse;
import interfaces.dto.responseDto.exceptionDto.BadRequestExceptionResponse;
import interfaces.dto.responseDto.exceptionDto.NotFoundExceptionResponse;
import interfaces.dto.responseDto.successDto.OkSuccessResponse;
import interfaces.http.RestEventHandlerWithRequest;
import interfaces.http.deckMovement.tokenMovement.addToken.dto.AddTokenData;
import interfaces.http.deckMovement.tokenMovement.addToken.dto.AddTokenRequest;
import static interfaces.dto.responseDto.EventResponseStatus.*;

public class AddTokenHandler implements RestEventHandlerWithRequest<AddTokenRequest> {
    private final GameAppService gameAppService;
    private final AddTokenMapper addTokenMapper;

    public AddTokenHandler(GameAppService gameAppService, AddTokenMapper addTokenMapper) {
        this.gameAppService = gameAppService;
        this.addTokenMapper = addTokenMapper;
    }

    @Override
    public EventResponse handleEvent(String gameId, String playerId, AddTokenRequest request) {
        try {
            AddTokenData data = addTokenMapper.toDomain(gameId, playerId, request);
            gameAppService.addToken(data.gameId(), data.playerId(), data.tokenId(), data.position());

            return new OkSuccessResponse<>(ADD_TOKEN, "Token added successfully");
        } catch (GameNotFoundException e) {
            return new NotFoundExceptionResponse(GAME_NOT_FOUND, e.getMessage());
        } catch (PlayerNotFoundException e) {
            return new NotFoundExceptionResponse(PLAYER_NOT_FOUND, e.getMessage());
        } catch (InvalidGameStatusException e) {
            return new BadRequestExceptionResponse(INVALID_GAME_STATUS, e.getMessage());
        } catch (TokenAlreadyInCurrentDeckException e) {
            return new BadRequestExceptionResponse(TOKEN_ALREADY_IN_CURRENT_DECK, e.getMessage());
        }
    }
}

