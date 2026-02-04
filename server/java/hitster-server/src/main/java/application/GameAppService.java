package application;

import domain.game.*;
import domain.game.item.token.TokenId;
import domain.exception.GameNotFoundException;
import domain.player.PlayerId;

import java.util.function.Consumer;

public class GameAppService {
    private final GameRepository gameRepository;

    public GameAppService(GameRepository gameRepository) {
        this.gameRepository = gameRepository;
    }

    public Game nextTurn(GameId gameId, PlayerId playerId) {
        return execute(gameId, game -> game.nextTurn(playerId));
    }

    public Game addCurrentCard(GameId gameId, PlayerId playerId) {
        return execute(gameId, game -> game.addCurrentCardToCurrentDeck(playerId));
    }

    public Game removeCurrentCard(GameId gameId, PlayerId playerId) {
        return execute(gameId, game -> game.removeCurrentCardFromCurrentDeck(playerId));
    }

    public Game returnCurrentCard(GameId gameId, PlayerId playerId) {
        return execute(gameId, game -> game.returnCurrentCardToPile(playerId));
    }

    public Game moveCurrentCard(GameId gameId, PlayerId playerId, int position) {
        return execute(gameId, game -> game.moveCurrentCardInCurrentDeck(playerId, position));
    }

    public Game addToken(GameId gameId, PlayerId playerId, TokenId tokenId, int position) {
        return execute(gameId, game -> game.addTokenToCurrentDeck(playerId, tokenId, position));
    }

    public Game removeToken(GameId gameId, PlayerId playerId, TokenId tokenId) {
        return execute(gameId, game -> game.removeTokenFromCurrentDeck(playerId, tokenId));
    }

    private Game execute(GameId gameId, Consumer<Game> action) {
        Game game = gameRepository.getGameId(gameId);
        if (game == null) {
            throw new GameNotFoundException(gameId);
        }
        action.accept(game);
        gameRepository.saveGame(game);
        return game;
    }
}
