package infrastructure.persistence.dao;

import java.util.Optional;

public interface GameStatusDao {
    Optional<String> getGameStatusByGameId(String gameId);
    void saveByGameId(String gameId, String status);
    void deleteByGameId(String gameId);
}
