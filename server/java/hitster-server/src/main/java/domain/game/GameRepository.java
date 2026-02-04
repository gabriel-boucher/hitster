package domain.game;

public interface GameRepository {
    Game getGameId(GameId gameId);
    void saveGame(Game game);
}
