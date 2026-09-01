package infrastructure.persistence.dao;

import infrastructure.persistence.dto.ItemPersistenceDto;

import java.util.List;

public interface CurrentItemsDao {
    List<ItemPersistenceDto> getCurrentDeckByGameId(String gameId, String currentPlayerId, String currentCardId);
    void saveCurrentDeckByGameId(String gameId, String currentCardId, List<ItemPersistenceDto> items);
    void deleteByGameId(String gameId);
}
