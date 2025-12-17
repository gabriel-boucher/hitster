package domain.game;

public interface GameRepository {
    Game getGameById(GameId gameId);
    void saveGame(Game game);
}
