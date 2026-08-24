package infrastructure.persistence.dao;

import infrastructure.persistence.dto.CardPersistenceDto;

import java.util.List;
import java.util.Optional;

public interface CardDao {
    Optional<CardPersistenceDto> getCurrentCardByGameId(String gameId, String cardId);
    List<CardPersistenceDto> getCardsByGameIdAndPlayerId(String gameId, String playerId);
    List<CardPersistenceDto> getStackCardsByGameId(String gameId);
    void saveCurrentCardByGameId(String gameId, CardPersistenceDto card);
    void saveByGameIdAndPlayerId(String gameId, String playerId, List<CardPersistenceDto> cards);
    void saveStackCardsByGameId(String gameId, List<CardPersistenceDto> cards);
}
