package infrastructure.persistence.dto;

public record GamePersistenceDto(
        String id,
        String currentPlayerId,
        String currentCardId
) {
}
