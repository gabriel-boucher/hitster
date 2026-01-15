package interfaces.mapper;

import domain.game.currentDeck.CurrentDeck;
import interfaces.dto.MoveableDto;

import java.util.List;

public class CurrentDeckMapper {
    private final MoveableMapper moveableMapper;

    public CurrentDeckMapper(MoveableMapper moveableMapper) {
        this.moveableMapper = moveableMapper;
    }

    public List<MoveableDto> toDto(CurrentDeck currentDeck) {
        return currentDeck.getCurrentItems().stream().map(moveableMapper::toDto).toList();
    }
}
