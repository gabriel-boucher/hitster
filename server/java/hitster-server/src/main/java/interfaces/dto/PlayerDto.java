package interfaces.dto;

public record PlayerDto(
        String id,
        PlayerDeckDto deck
) {
}
