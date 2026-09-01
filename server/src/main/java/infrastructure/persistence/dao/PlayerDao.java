package infrastructure.persistence.dao;

import infrastructure.persistence.dto.PlayerPersistenceDto;

import java.util.List;

public interface PlayerDao {
    List<PlayerPersistenceDto> getPlayersByGameId(String gameId);
    void saveByGameId(String gameId, List<PlayerPersistenceDto> players);
    void deleteByGameId(String gameId);
}
