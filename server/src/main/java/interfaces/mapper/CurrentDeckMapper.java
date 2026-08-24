package interfaces.mapper;

import domain.deck.currentDeck.CurrentDeck;
import domain.deck.item.Moveable;
import domain.deck.item.card.Card;
import interfaces.dto.MoveableDto;

import java.util.List;

public class CurrentDeckMapper {
    private final MoveableMapper moveableMapper;

    public CurrentDeckMapper(MoveableMapper moveableMapper) {
        this.moveableMapper = moveableMapper;
    }

    public List<MoveableDto> toDto(CurrentDeck currentDeck, Card currentCard) {
        return currentDeck.getCurrentItems()
                .stream()
                .map(item -> moveableMapper.toDto(stripCurrentCardDetails(item, currentCard)))
                .toList();
    }

    private Moveable stripCurrentCardDetails(Moveable item, Card currentCard) {
        if (item instanceof Card card && card.getId() == currentCard.getId()) {
            return new Card(
                    currentCard.getId(),
                    currentCard.getStatus(),
                    "",
                    "",
                    0,
                    ""
            );
        }
        return item;
    }
}
