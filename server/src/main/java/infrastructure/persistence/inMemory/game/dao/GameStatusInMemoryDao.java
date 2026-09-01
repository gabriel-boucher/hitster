package infrastructure.persistence.inMemory.game.dao;

import infrastructure.persistence.dao.GameStatusDao;

import java.util.Map;
import java.util.Optional;

public class GameStatusInMemoryDao implements GameStatusDao {
    private final Map<String, String> gameStatuses;

    public GameStatusInMemoryDao(Map<String, String> gameStatuses) {
        this.gameStatuses = gameStatuses;
    }

    @Override
    public Optional<String> getGameStatusByGameId(String gameId) {
        return Optional.ofNullable(gameStatuses.get(gameId));
    }

    @Override
    public void saveByGameId(String gameId, String status) {
        gameStatuses.put(gameId, status);
    }

    @Override
    public void deleteByGameId(String gameId) {
        gameStatuses.remove(gameId);
    }
}
