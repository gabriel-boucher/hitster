package infrastructure.persistence.dao;

import infrastructure.persistence.dto.GamePersistenceDto;

import java.util.Optional;

public interface GameDao {
    Optional<GamePersistenceDto> getGameById(String gameId);
    void saveGame(GamePersistenceDto game);
}
