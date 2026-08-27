package infrastructure.persistence.inMemory.player.dto;

public record PlayerInMemoryDto(
        String id,
        String name,
        String color,
        boolean isPlaying
) {
}
