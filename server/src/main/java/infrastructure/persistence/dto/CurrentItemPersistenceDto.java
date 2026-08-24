package infrastructure.persistence.dto;

public record CurrentItemPersistenceDto(
        String id,
        String playerId,
        int position
) {
}
