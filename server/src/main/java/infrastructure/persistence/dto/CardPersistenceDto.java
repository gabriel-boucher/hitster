package infrastructure.persistence.dto;

public record CardPersistenceDto(
        String id,
        String status,
        String song,
        String artist,
        int date,
        String albumUrl
) implements ItemPersistenceDto {
}
