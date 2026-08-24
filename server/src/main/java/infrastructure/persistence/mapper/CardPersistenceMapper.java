package infrastructure.persistence.mapper;

import domain.deck.item.ItemStatus;
import domain.deck.item.card.Card;
import domain.deck.item.card.CardId;
import infrastructure.persistence.dto.CardPersistenceDto;

public class CardPersistenceMapper {
    public Card toDomain(CardPersistenceDto cardPersistenceDto) {
        return new Card(
                new CardId(cardPersistenceDto.id()),
                ItemStatus.valueOf(cardPersistenceDto.status()),
                cardPersistenceDto.song(), cardPersistenceDto.artist(),
                cardPersistenceDto.date(),
                cardPersistenceDto.albumUrl()
        );
    }

    public CardPersistenceDto toDto(Card card) {
        return new CardPersistenceDto(
                card.getId().toString(),
                card.getStatus().name(),
                card.getSong(),
                card.getArtist(),
                card.getDate(),
                card.getAlbumUrl()
        );
    }
}
