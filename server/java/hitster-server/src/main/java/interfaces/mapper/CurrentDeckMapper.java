package interfaces.mapper;

import domain.game.deck.CurrentDeck;
import interfaces.dto.CurrentDeckDto;

public class CurrentDeckMapper {
    private final MoveableMapper moveableMapper;

    public CurrentDeckMapper(MoveableMapper moveableMapper) {
        this.moveableMapper = moveableMapper;
    }

    public CurrentDeckDto toDto(CurrentDeck currentDeck) {
        return new CurrentDeckDto(
                currentDeck.getCurrentItems().stream().map(moveableMapper::toDto).toList()
        );
    }
}
