package infrastructure.persistence.mapper;

import domain.deck.item.Moveable;
import domain.deck.item.card.Card;
import domain.deck.item.token.Token;
import infrastructure.persistence.dto.CardPersistenceDto;
import infrastructure.persistence.dto.ItemPersistenceDto;
import infrastructure.persistence.dto.TokenPersistenceDto;

public class CurrentItemPersistenceMapper {
    private final CardPersistenceMapper cardPersistenceMapper;
    private final TokenPersistenceMapper tokenPersistenceMapper;

    public CurrentItemPersistenceMapper(CardPersistenceMapper cardPersistenceMapper, TokenPersistenceMapper tokenPersistenceMapper) {
        this.cardPersistenceMapper = cardPersistenceMapper;
        this.tokenPersistenceMapper = tokenPersistenceMapper;
    }

    public Moveable toDomain(ItemPersistenceDto itemPersistenceDto) {
        if (itemPersistenceDto instanceof CardPersistenceDto cardPersistenceDto) {
            return cardPersistenceMapper.toDomain(cardPersistenceDto);
        } else if (itemPersistenceDto instanceof TokenPersistenceDto tokenPersistenceDto) {
            return tokenPersistenceMapper.toDomain(tokenPersistenceDto);
        } else {
            throw new IllegalArgumentException("Unknown item type: " + itemPersistenceDto.getClass().getName());
        }
    }

    public ItemPersistenceDto toDto(Moveable moveable) {
        if (moveable instanceof Card card) {
            return cardPersistenceMapper.toDto(card);
        } else if (moveable instanceof Token token) {
            return tokenPersistenceMapper.toDto(token);
        } else {
            throw new IllegalArgumentException("Unknown item type: " + moveable.getClass().getName());
        }
    }
}
