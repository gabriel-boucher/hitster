package interfaces.mapper;

import domain.game.deck.card.Card;
import interfaces.dto.CardDto;

public class CardMapper {
    public CardDto toDto(Card card) {
        return new CardDto(
                card.getId().toString(),
                card.getStatus().name(),
                card.getDate()
        );
    }
}
