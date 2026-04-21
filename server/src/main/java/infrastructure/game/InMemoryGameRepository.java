package infrastructure.game;

import domain.game.Game;
import domain.game.GameId;
import domain.game.GameRepository;

import java.util.HashMap;

public class InMemoryGameRepository implements GameRepository {
    private final HashMap<GameId, Game> gameStates;

    public InMemoryGameRepository() {
        this.gameStates = new HashMap<>();
    }

    @Override
    public Game getGameId(GameId gameId) {
        return gameStates.get(gameId);
    }

    @Override
    public void saveGame(Game game) {
        gameStates.put(game.getId(), game);
    }
}
