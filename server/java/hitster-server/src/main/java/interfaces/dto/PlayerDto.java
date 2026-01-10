package interfaces.dto;

public record PlayerDto(
        String id,
        String name,
        String color,
        PlayerDeckDto deck
) {
}
