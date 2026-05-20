package application;

import domain.connection.ConnectionServer;
import domain.game.*;
import domain.game.item.token.TokenId;
import domain.exception.GameNotFoundException;
import domain.player.PlayerId;

import java.util.function.Consumer;

public class GameAppService {
    private final GameRepository gameRepository;
    private final ConnectionServer connectionServer;

    public GameAppService(GameRepository gameRepository, ConnectionServer connectionServer) {
        this.gameRepository = gameRepository;
        this.connectionServer = connectionServer;
    }

    public void nextTurn(GameId gameId, PlayerId playerId) {
        Game g = execute(gameId, game -> game.nextTurn(playerId));
        connectionServer.broadcastGameState(g);
    }

    public void addCurrentCard(GameId gameId, PlayerId playerId) {
        Game g = execute(gameId, game -> game.addCurrentCardToCurrentDeck(playerId));
        connectionServer.broadcastGameState(g);
    }

    public void removeCurrentCard(GameId gameId, PlayerId playerId) {
        Game g = execute(gameId, game -> game.removeCurrentCardFromCurrentDeck(playerId));
        connectionServer.broadcastGameState(g);
    }

    public void returnCurrentCard(GameId gameId, PlayerId playerId) {
        Game g = execute(gameId, game -> game.returnCurrentCardToPile(playerId));
        connectionServer.broadcastGameState(g);
    }

    public void moveCurrentCard(GameId gameId, PlayerId playerId, int position) {
        Game g = execute(gameId, game -> game.moveCurrentCardInCurrentDeck(playerId, position));
        connectionServer.broadcastGameState(g);
    }

    public void addToken(GameId gameId, PlayerId playerId, TokenId tokenId, int position) {
        Game g = execute(gameId, game -> game.addTokenToCurrentDeck(playerId, tokenId, position));
        connectionServer.broadcastGameState(g);
    }

    public void removeToken(GameId gameId, PlayerId playerId, TokenId tokenId) {
        Game g = execute(gameId, game -> game.removeTokenFromCurrentDeck(playerId, tokenId));
        connectionServer.broadcastGameStateExceptPlayer(g, playerId);
    }

    private Game execute(GameId gameId, Consumer<Game> action) {
        Game game = gameRepository.getGameById(gameId)
                .orElseThrow(() -> new GameNotFoundException(gameId));
        action.accept(game);
        gameRepository.saveGame(game);
        return game;
    }
}
