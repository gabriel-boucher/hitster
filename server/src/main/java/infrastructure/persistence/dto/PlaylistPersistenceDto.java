package infrastructure.persistence.dto;

public record PlaylistPersistenceDto(
    String id,
    String name,
    String imageUrl,
    int totalTracks
) {
}
