package application;

import application.exception.NoPlaylistSelectedException;
import domain.exception.RoomNotFoundException;
import domain.game.*;
import domain.game.deck.card.Card;
import domain.game.deck.token.TokenId;
import domain.exception.GameNotFoundException;
import domain.player.PlayerId;
import domain.room.Room;
import domain.room.RoomId;
import domain.room.RoomRepository;
import domain.spotify.Playlist;

import java.util.List;
import java.util.function.Consumer;

public class GameAppService {
    private final GameRepository gameRepository;
    private final RoomRepository roomRepository;
    private final CardRepository cardRepository;
    private final GameFactory gameFactory;

    public GameAppService(GameRepository gameRepository, RoomRepository roomRepository, CardRepository cardRepository, GameFactory gameFactory) {
        this.gameRepository = gameRepository;
        this.roomRepository = roomRepository;
        this.cardRepository = cardRepository;
        this.gameFactory = gameFactory;
    }

    public Game startGame(RoomId roomId, PlayerId playerId) {
        Room room = roomRepository.getRoomById(roomId);
        if (room == null) {
            throw new RoomNotFoundException(roomId);
        }
        List<Card> pile = cardRepository.getCardsByPlaylistIds(room.getPlaylists().stream().map(Playlist::id).toList());
        if (pile.isEmpty()) {
            throw new NoPlaylistSelectedException();
        }

        Game game = gameFactory.createGame(room, pile);
        game.startGame(playerId);
        gameRepository.saveGame(game);
        return game;
    }

    public Game nextTurn(GameId gameId, PlayerId playerId) {
        return execute(gameId, game -> game.nextTurn(playerId));
    }

    public Game addCurrentCard(GameId gameId, PlayerId playerId, int position) {
        return execute(gameId, game -> game.addCurrentCardToCurrentDeck(playerId, position));
    }

    public Game removeCurrentCard(GameId gameId, PlayerId playerId) {
        return execute(gameId, game -> game.removeCurrentCardFromCurrentDeck(playerId));
    }

    public Game reorderCurrentCard(GameId gameId, PlayerId playerId, int newPosition) {
        return execute(gameId, game -> game.reorderCurrentCardInCurrentDeck(playerId, newPosition));
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
