package interfaces.dto;

import java.util.List;

public record PlayerDeckDto(
        List<CardDto> cards,
        List<TokenDto> tokens
) {
}
