package infrastructure.persistence.inMemory.deck.dao;

import infrastructure.persistence.dao.CardDao;
import infrastructure.persistence.dao.CurrentItemsDao;
import infrastructure.persistence.dao.TokenDao;
import infrastructure.persistence.dto.CardPersistenceDto;
import infrastructure.persistence.dto.CurrentItemPersistenceDto;
import infrastructure.persistence.dto.ItemPersistenceDto;
import infrastructure.persistence.dto.TokenPersistenceDto;

import java.util.*;

public class CurrentItemsInMemoryDao implements CurrentItemsDao {
    private final CardDao cardDao;
    private final TokenDao tokenDao;

    private final Map<String, List<CurrentItemPersistenceDto>> currentItems;

    public CurrentItemsInMemoryDao(CardDao cardDao, TokenDao tokenDao, Map<String, List<CurrentItemPersistenceDto>> currentItems) {
        this.cardDao = cardDao;
        this.tokenDao = tokenDao;
        this.currentItems = currentItems;
    }

    @Override
    public List<ItemPersistenceDto> getCurrentDeckByGameId(String gameId, String currentPlayerId, String currentCardId) {
        List<ItemPersistenceDto> items = new ArrayList<>(cardDao.getCardsByGameIdAndPlayerId(gameId, currentPlayerId));
        List<CurrentItemPersistenceDto> currentItemsList = currentItems.getOrDefault(gameId, Collections.emptyList())
                .stream()
                .sorted(Comparator.comparingInt(CurrentItemPersistenceDto::position))
                .toList();
        for (CurrentItemPersistenceDto item : currentItemsList) {
            if (item.id().equals(currentCardId)) {
                Optional<CardPersistenceDto> currentCard = cardDao.getCurrentCardByGameId(gameId, currentCardId);
                currentCard.ifPresent(card -> items.add(item.position(), card));
            } else {
                Optional<TokenPersistenceDto> currentToken = tokenDao.getTokenByGameIdAndPlayerIdAndTokenId(gameId, item.playerId(), item.id());
                currentToken.ifPresent(token -> items.add(item.position(), token));
            }
        }

        return items;
    }

    @Override
    public void saveCurrentDeckByGameId(String gameId, String currentCardId, List<ItemPersistenceDto> items) {
        List<CurrentItemPersistenceDto> currentItemsList = new ArrayList<>();
        for (ItemPersistenceDto item : items) {
            if (item instanceof CardPersistenceDto card && card.id().equals(currentCardId)) {
                currentItemsList.add(new CurrentItemPersistenceDto(card.id(), "stack", items.indexOf(card)));
                cardDao.saveCurrentCardByGameId(gameId, card);
            } else if (item instanceof TokenPersistenceDto token) {
                currentItemsList.add(new CurrentItemPersistenceDto(token.id(), token.ownerId(), items.indexOf(token)));
                tokenDao.saveByGameIdAndPlayerIdAndTokenId(gameId, token.ownerId(), token.id(), token);
            }
        }
        currentItems.put(gameId, currentItemsList);
    }

    @Override
    public void deleteByGameId(String gameId) {
        currentItems.remove(gameId);
    }
}
