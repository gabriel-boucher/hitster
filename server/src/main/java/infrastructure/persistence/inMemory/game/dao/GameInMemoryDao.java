package infrastructure.persistence.inMemory.game.dao;

import infrastructure.persistence.dao.GameDao;
import infrastructure.persistence.dto.GamePersistenceDto;
import infrastructure.persistence.dto.RoomPersistenceDto;

import java.util.Map;
import java.util.Optional;

public class GameInMemoryDao implements GameDao {
    private final Map<String, GamePersistenceDto> games;

    public GameInMemoryDao(Map<String, GamePersistenceDto> games) {
        this.games = games;
    }

    @Override
    public Optional<GamePersistenceDto> getGameById(String gameId) {
        return Optional.ofNullable(games.get(gameId));
    }

    @Override
    public void saveGame(GamePersistenceDto game) {
        games.put(game.id(), game);
    }
}
