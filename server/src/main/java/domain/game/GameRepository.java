package domain.game;

import java.util.Optional;

public interface GameRepository {
    Optional<Game> getGameById(GameId gameId);
    void saveGame(Game game);
}
