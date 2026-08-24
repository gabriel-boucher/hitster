package infrastructure.persistence.dto;

public record TokenPersistenceDto(
    String id,
    String status,
    String ownerId
) implements ItemPersistenceDto {
}
