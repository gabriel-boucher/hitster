package infrastructure.persistence.dto;

import java.util.List;

public record PlayerPersistenceDto(
        String id,
        String name,
        String color,
        List<CardPersistenceDto> cards,
        List<TokenPersistenceDto> tokens
) {
}
