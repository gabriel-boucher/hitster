package interfaces.dto;

import java.util.List;

public record CurrentDeckDto (
        List<MoveableDto> currentItems
) {
}
