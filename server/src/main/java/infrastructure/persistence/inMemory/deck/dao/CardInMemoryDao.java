package infrastructure.persistence.inMemory.deck.dao;

import infrastructure.persistence.dao.CardDao;
import infrastructure.persistence.dto.CardPersistenceDto;

import java.util.*;

public class CardInMemoryDao implements CardDao {
    private final Map<String, Map<String, List<CardPersistenceDto>>> cards;

    public CardInMemoryDao(Map<String, Map<String, List<CardPersistenceDto>>> cards) {
        this.cards = cards;
    }

    @Override
    public Optional<CardPersistenceDto> getCurrentCardByGameId(String gameId, String cardId) {
        return getStackCardsByGameId(gameId).stream()
                .filter(card -> card.id().equals(cardId))
                .findFirst();
    }

    @Override
    public List<CardPersistenceDto> getCardsByGameIdAndPlayerId(String gameId, String playerId) {
        return cards.getOrDefault(gameId, Collections.emptyMap()).getOrDefault(playerId, Collections.emptyList());
    }

    @Override
    public List<CardPersistenceDto> getStackCardsByGameId(String gameId) {
        return cards.getOrDefault(gameId, Collections.emptyMap()).getOrDefault("stack", Collections.emptyList());
    }

    @Override
    public void saveCurrentCardByGameId(String gameId, CardPersistenceDto card) {
        getStackCardsByGameId(gameId).replaceAll(c -> c.id().equals(card.id()) ? card : c);
    }

    @Override
    public void saveByGameIdAndPlayerId(String gameId, String playerId, List<CardPersistenceDto> cards) {
        this.cards.computeIfAbsent(gameId, k -> new HashMap<>()).put(playerId, cards);
    }

    @Override
    public void saveStackCardsByGameId(String gameId, List<CardPersistenceDto> cards) {
        this.cards.computeIfAbsent(gameId, k -> new HashMap<>()).put("stack", cards);
    }

    @Override
    public void deleteByGameId(String gameId) {
        cards.remove(gameId);
    }
}
