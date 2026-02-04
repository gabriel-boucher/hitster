package interfaces.mapper;

import domain.game.currentDeck.CurrentDeck;
import domain.game.item.Moveable;
import domain.game.item.card.Card;
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
                    currentCard.getDate(),
                    ""
            );
        }
        return item;
    }
}
