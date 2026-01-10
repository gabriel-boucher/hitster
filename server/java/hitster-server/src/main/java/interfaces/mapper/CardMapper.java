package interfaces.mapper;

import domain.game.item.card.Card;
import interfaces.dto.CardDto;

public class CardMapper {
    public CardDto toDto(Card card) {
        return new CardDto(
                card.getId().toString(),
                card.getStatus().name(),
                card.getSong(),
                card.getArtist(),
                card.getDate(),
                card.getAlbumUrl()
        );
    }
}
